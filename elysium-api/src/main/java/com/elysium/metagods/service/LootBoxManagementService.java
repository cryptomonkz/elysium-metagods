package com.elysium.metagods.service;

import com.elysium.metagods.domain.*;
import com.elysium.metagods.exception.ForbiddenRequestException;
import com.elysium.metagods.exception.InvalidRequestException;
import com.elysium.metagods.exception.ServerErrorException;
import com.elysium.metagods.helper.RandomHelper;
import com.elysium.metagods.security.SecurityUtils;
import com.elysium.metagods.service.connector.Web3ServiceConnector;
import com.elysium.metagods.service.constant.TokenStandard;
import com.elysium.metagods.service.dto.LootBoxResultDTO;
import com.elysium.metagods.service.dto.LootBoxRewardClaimBaseDTO;
import com.elysium.metagods.service.dto.LootBoxRewardClaimResponse;
import com.elysium.metagods.service.dto.entity.LootBoxBundleDTO;
import com.elysium.metagods.service.dto.entity.LootBoxOwnedDTO;
import com.elysium.metagods.service.dto.entity.LootBoxRewardHistoryBaseDTO;
import com.elysium.metagods.service.dto.request.SignLootBoxRewardClaimRequest;
import com.elysium.metagods.service.entity.*;
import com.elysium.metagods.service.mapper.LootBoxBundleMapper;
import com.elysium.metagods.service.mapper.LootBoxItemMapper;
import com.elysium.metagods.service.mapper.LootBoxRewardHistoryMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.rng.UniformRandomProvider;
import org.apache.commons.rng.sampling.DiscreteProbabilityCollectionSampler;
import org.apache.commons.rng.simple.RandomSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.elysium.metagods.config.ApplicationConfigurationConstant.LOOT_BOX_ROULETTE_NUMBER_OF_ITEMS_TO_INCLUDE;
import static com.elysium.metagods.config.ApplicationConfigurationConstant.NUMBER_OF_RARE_ITEMS_TO_INCLUDE_IN_LOOT_BOX_ROULETTE_LIST;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class LootBoxManagementService {

    private final LootBoxService lootBoxService;

    private final LootBoxOwnedService lootBoxOwnedService;

    private final LootBoxItemService lootBoxItemService;

    private final LootBoxBundleService lootBoxBundleService;

    private final LootBoxPurchaseHistoryService lootBoxPurchaseHistoryService;

    private final LootBoxRewardHistoryService lootBoxRewardHistoryService;

    private final LootBoxRewardHistoryPoolService lootBoxRewardHistoryPoolService;

    private final WalletService walletService;

    private final Web3ServiceConnector web3ServiceConnector;

    private final LootBoxItemMapper lootBoxItemMapper;

    private final LootBoxBundleMapper lootBoxBundleMapper;

    private final LootBoxRewardHistoryMapper lootBoxRewardHistoryMapper;

    public List<LootBoxBundleDTO> getBundles() {
        return lootBoxBundleMapper.toDto(lootBoxBundleService.findAll());
    }

    public List<LootBoxOwnedDTO> getOwnedBoxes(@NotNull String address) {
        Wallet owner = walletService.findOneStrict(address);
        return lootBoxOwnedService.findAllByOwner(owner);
    }

    public void buyBundle(Long bundleId) {
        Wallet wallet = walletService.findOrCreateCurrent();
        LootBoxBundle lootBoxBundle = lootBoxBundleService.findByIdOrThrow(bundleId);
        log.info("Request to buy bundle ${} from ${}", bundleId, wallet.getAddress());
        if(lootBoxBundle.hasStockLimit()) {
            lootBoxBundleService.subtractStockFromLootBoxBundle(lootBoxBundle.getId(), 1L);
        }
        walletService.subtractAmountFromWallet(wallet, lootBoxBundle.getPrice().doubleValue());
        LootBoxOwned lootBoxOwned = lootBoxOwnedService.findOrCreate(wallet, lootBoxBundle.getLootBox());
        lootBoxOwnedService.addAmountOwnedToLootBoxOwned(lootBoxOwned.getId(), lootBoxBundle.getAmount());
        lootBoxPurchaseHistoryService.saveEntity(
            new LootBoxPurchaseHistory()
                .setBundleId(bundleId)
                .setBundleData(lootBoxBundleMapper.toDto(lootBoxBundle))
                .setWalletAddress(wallet.getAddress())
                .setWalletId(wallet.getId())
                .setCost(lootBoxBundle.getPrice())
        );
    }

    public LootBoxResultDTO openLootBox(Long lootBoxId) {
        Wallet wallet = walletService.findOrCreateCurrent();
        LootBox lootBox = lootBoxService.findByIdOrThrow(lootBoxId);
        log.info("Request to open LootBox ${} from ${}", lootBoxId, wallet.getAddress());
        LootBoxOwned lootBoxOwned = lootBoxOwnedService.findOrCreate(wallet, lootBox);
        lootBoxOwnedService.subtractAmountOwnedFromLootBoxOwned(lootBoxOwned.getId(), 1L);
        Set<LootBoxItem> potentialPrizes = lootBox.getAvailableItems();
        DiscreteProbabilityCollectionSampler<LootBoxItem> sampler = buildRewardsSampler(potentialPrizes);
        LootBoxItem wonItem = sampler.sample();
        lootBoxItemService.subtractFromAmountAvailable(wonItem.getId(), 1L);
        persistReward(wallet, lootBox, potentialPrizes, wonItem);
        return buildRouletteItemsAndResultDTO(potentialPrizes, sampler, wonItem);
    }

    public Page<LootBoxRewardHistoryBaseDTO> getRewardHistory(@NotNull String address, Pageable pageable) {
        Wallet owner = walletService.findOneStrict(address);
        return lootBoxRewardHistoryService.findAllByOwner(owner, pageable)
                                          .map(lootBoxRewardHistoryMapper::toBaseDto);
    }

    public LootBoxRewardClaimResponse getRewardClaimData(Long rewardId) {
        LootBoxRewardHistory rewardHistory = lootBoxRewardHistoryService.findByIdOrThrow(rewardId);
        log.info("Request to claim reward ${} from ${}", rewardId, SecurityUtils.getCurrentUserAddressStrict());
        validateClaimRewardRequest(rewardHistory);
        LootBoxRewardClaimBaseDTO rewardClaimBaseDTO = buildLootBoxRewardClaimSigning(rewardHistory);
        String signature = web3ServiceConnector
            .signClaimRewardRequest(
                new SignLootBoxRewardClaimRequest()
                    .setRewardClaimBase(rewardClaimBaseDTO)
                    .setWalletAddress(SecurityUtils.getCurrentUserAddressStrict())
            )
            .orElseThrow(() -> new ServerErrorException("Could not generate reward claiming signature"));
        return new LootBoxRewardClaimResponse()
            .setRewardClaimBase(rewardClaimBaseDTO)
            .setSignature(signature);
    }

    private LootBoxRewardClaimBaseDTO buildLootBoxRewardClaimSigning(LootBoxRewardHistory rewardHistory) {
        LootBoxRewardClaimBaseDTO rewardClaimBaseDTO = new LootBoxRewardClaimBaseDTO();
        rewardClaimBaseDTO.setRequestIdentifier(rewardHistory.getId());
        if(rewardHistory.getReward().getErc20Item() != null) {
            LootBoxErc20Item erc20Item = rewardHistory.getReward().getErc20Item();
            rewardClaimBaseDTO.setFromAddress(erc20Item.getFromAddress());
            rewardClaimBaseDTO.setCollectionAddress(erc20Item.getCollectionAddress());
            rewardClaimBaseDTO.setAmount(erc20Item.getAmount());
            rewardClaimBaseDTO.setTokenStandard(TokenStandard.ERC20);
        } else if (rewardHistory.getReward().getErc721Item() != null) {
            LootBoxErc721Item erc721Item = rewardHistory.getReward().getErc721Item();
            rewardClaimBaseDTO.setFromAddress(erc721Item.getFromAddress());
            rewardClaimBaseDTO.setCollectionAddress(erc721Item.getCollectionAddress());
            rewardClaimBaseDTO.setTokenId(erc721Item.getTokenId());
            rewardClaimBaseDTO.setTokenStandard(TokenStandard.ERC721);
        } else if (rewardHistory.getReward().getErc1155Item() != null) {
            LootBoxErc1155Item erc1155Item = rewardHistory.getReward().getErc1155Item();
            rewardClaimBaseDTO.setFromAddress(erc1155Item.getFromAddress());
            rewardClaimBaseDTO.setCollectionAddress(erc1155Item.getCollectionAddress());
            rewardClaimBaseDTO.setTokenId(erc1155Item.getTokenId());
            rewardClaimBaseDTO.setAmount(erc1155Item.getAmount());
            rewardClaimBaseDTO.setTokenStandard(TokenStandard.ERC1155);
        } else {
            throw new ServerErrorException("On-chain item does not have details attached");
        }
        return rewardClaimBaseDTO;
    }

    private LootBoxResultDTO buildRouletteItemsAndResultDTO(
        Set<LootBoxItem> potentialPrizes,
        DiscreteProbabilityCollectionSampler<LootBoxItem> sampler,
        LootBoxItem wonItem
    ) {
        List<LootBoxItem> rouletteItems = new ArrayList<>();
        potentialPrizes.stream()
                       .sorted(Comparator.comparing(LootBoxItem::getWeight))
                       .limit(NUMBER_OF_RARE_ITEMS_TO_INCLUDE_IN_LOOT_BOX_ROULETTE_LIST)
                       .forEach(rouletteItems::add);
        IntStream.rangeClosed(1, LOOT_BOX_ROULETTE_NUMBER_OF_ITEMS_TO_INCLUDE - rouletteItems.size() - 1)
                 .forEach(i -> rouletteItems.add(sampler.sample()));
        Collections.shuffle(rouletteItems);
        Integer wonItemIndex = RandomHelper.getRandomNumberBetweenInterval(
            LOOT_BOX_ROULETTE_NUMBER_OF_ITEMS_TO_INCLUDE * 85 / 100,
            LOOT_BOX_ROULETTE_NUMBER_OF_ITEMS_TO_INCLUDE * 95 / 100
        );
        rouletteItems.add(wonItemIndex, wonItem);
        return new LootBoxResultDTO()
            .setWonItemIndex(wonItemIndex.longValue())
            .setRouletteItems(lootBoxItemMapper.toRouletteItemDto(rouletteItems));
    }

    private void persistReward(Wallet wallet, LootBox lootBox, Set<LootBoxItem> potentialPrizes, LootBoxItem wonItem) {
        LootBoxRewardHistory lootBoxRewardHistory = lootBoxRewardHistoryService.saveEntity(
            new LootBoxRewardHistory()
                .setLootBox(lootBox)
                .setReward(wonItem)
                .setOwner(wallet)
                .setOpenedOn(Instant.now())
        );
        if(wonItem.getInGameTokenItem() != null) {
            walletService.addAmountToCurrentWallet(wonItem.getInGameTokenItem().getAmount().doubleValue());
        }
        lootBoxRewardHistoryPoolService.saveEntity(
            new LootBoxRewardHistoryPool()
                .setRewardHistory(lootBoxRewardHistory)
                .setPotentialRewards(lootBoxItemMapper.toDto(new ArrayList<>(potentialPrizes)))
        );
    }

    private DiscreteProbabilityCollectionSampler<LootBoxItem> buildRewardsSampler(Set<LootBoxItem> potentialPrizes) {
        UniformRandomProvider rng = RandomSource.MT.create();
        return new DiscreteProbabilityCollectionSampler<>(
            rng,
            potentialPrizes.stream()
                           .collect(
                               Collectors.toMap(
                                   Function.identity(),
                                   (LootBoxItem lootBoxItem) -> lootBoxItem.getWeight().doubleValue()
                               )
                           )
        );
    }

    private void validateClaimRewardRequest(LootBoxRewardHistory rewardHistory) {
        if(!rewardHistory.getReward().getIsOnChain()) {
            throw new InvalidRequestException("Cannot generate signature for off-chain reward");
        }
        String currentUserAddress = SecurityUtils.getCurrentUserAddressStrict();
        if (!rewardHistory.getOwner().getAddress().equalsIgnoreCase(currentUserAddress)) {
            throw new ForbiddenRequestException(String.format(
                "%s is not the owner of reward %d",
                currentUserAddress,
                rewardHistory.getId()
            ));
        }
    }
}
