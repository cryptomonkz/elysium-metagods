package com.elysium.metagods.service.connector;

import com.elysium.metagods.config.ApplicationConfigurationProperties;
import com.elysium.metagods.domain.PendingTokenSpending;
import com.elysium.metagods.security.SecurityUtils;
import com.elysium.metagods.service.constant.ContractMethod;
import com.elysium.metagods.service.dto.LootBoxRewardClaimResponse;
import com.elysium.metagods.service.dto.request.*;
import com.elysium.metagods.service.dto.response.RecoverSignatureResponse;
import com.elysium.metagods.service.dto.response.TransformAmountResponse;
import com.elysium.metagods.service.dto.response.SignatureResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.constraints.NotNull;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class Web3ServiceConnector extends Connector {

    private static final String API_PATH_SEGMENT = "api";
    private static final String WEB3_PATH_SEGMENT = "web3";
    private static final String RECOVER_PERSONAL_SIGNATURE_PATH_SEGMENT = "recoverPersonalSignature";
    private static final String SIGN_CLAIM_REWARD_PATH_SEGMENT = "signClaimRewardRequest";
    private static final String SIGN_WITHDRAW_REQUEST_PATH_SEGMENT = "signWithdrawRequest";
    private static final String SIGN_MINT_WEAPONS_REQUEST_PATH_SEGMENT = "signMintWeaponsRequest";
    private static final String TO_WEI_PATH_SEGMENT = "toWei";
    private static final String FROM_WEI_PATH_SEGMENT = "fromWei";
    private static final String CONTRACT_PATH_SEGMENT = "contract";
    private static final String DEPOSIT_EVENTS_PATH_SEGMENT = "depositEvents";
    private static final String WITHDRAW_EVENTS_PATH_SEGMENT = "withdrawEvents";
    private static final String MINT_WEAPONS_EVENTS_PATH_SEGMENT = "mintWeaponsEvents";
    private static final String VALIDATE_ADDRESS_FORMAT_PATH_SEGMENT = "validateAddressFormat";

    private static final String FROM_BLOCK_QUERY_PARAM = "fromBlock";

    private final URI baseURI;

    public Web3ServiceConnector(RestTemplate restTemplate, ApplicationConfigurationProperties properties) {
        super(restTemplate);
        baseURI = UriComponentsBuilder
            .fromUriString(properties.getWeb3().getServiceURL())
            .pathSegment(API_PATH_SEGMENT)
            .pathSegment(WEB3_PATH_SEGMENT)
            .build()
            .toUri();
    }

    public Optional<String> recoverPersonalSignature(@NotNull Object data, @NotNull String signature) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder
            .fromUri(baseURI)
            .pathSegment(RECOVER_PERSONAL_SIGNATURE_PATH_SEGMENT);
        return doPost(
            uriBuilder,
            () -> getHttpEntityWithJSON(new RecoverSignatureRequest().setSignature(signature).setData(data)),
            () -> new ParameterizedTypeReference<RecoverSignatureResponse>() {}
        ).map(RecoverSignatureResponse::getSignerWallet);
    }

    public Optional<String> signClaimRewardRequest(
        @NotNull SignLootBoxRewardClaimRequest signLootBoxRewardClaimRequest
    ) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder
            .fromUri(baseURI)
            .pathSegment(SIGN_CLAIM_REWARD_PATH_SEGMENT);
        return doPost(
            uriBuilder,
            () -> getHttpEntityWithJSON(signLootBoxRewardClaimRequest),
            () -> new ParameterizedTypeReference<SignatureResponse>() {}
        ).map(SignatureResponse::getSignature);
    }

    public Optional<String> signWithdrawRequest(
        @NotNull PendingTokenSpending withdrawRequest, @NotNull String amountInWei, @NotNull Long timestampInSeconds
    ) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder
            .fromUri(baseURI)
            .pathSegment(SIGN_WITHDRAW_REQUEST_PATH_SEGMENT);
        return doPost(
            uriBuilder,
            () -> getHttpEntityWithJSON(new SignAmountRequest()
                .setAmount(amountInWei)
                .setWalletAddress(withdrawRequest.getBlockedAmount().getWallet().getAddress())
                .setInternalIdentifier(withdrawRequest.getId())
                .setGenerationDate(timestampInSeconds)),
            () -> new ParameterizedTypeReference<SignatureResponse>() {}
        ).map(SignatureResponse::getSignature);
    }

    public Optional<String> signMintWeaponsRequest(
        @NotNull PendingTokenSpending withdrawRequest,
        @NotNull Long mintCount,
        @NotNull Long timestampInSeconds,
        @NotNull String price
    ) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder
            .fromUri(baseURI)
            .pathSegment(SIGN_MINT_WEAPONS_REQUEST_PATH_SEGMENT);
        return doPost(
            uriBuilder,
            () -> getHttpEntityWithJSON(new SignMintWeaponsAmountRequest()
                .setPrice(price)
                .setMintCount(mintCount)
                .setWalletAddress(withdrawRequest.getBlockedAmount().getWallet().getAddress())
                .setInternalIdentifier(withdrawRequest.getId())
                .setGenerationDate(timestampInSeconds)),
            () -> new ParameterizedTypeReference<SignatureResponse>() {}
        ).map(SignatureResponse::getSignature);
    }

    public <Res> Optional<Res> callContractMethod(
        ContractType contractType,
        ContractMethodRequest contractMethodRequest,
        ParameterizedTypeReference<Res> typeReference
    ) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder
            .fromUri(baseURI)
            .pathSegment(CONTRACT_PATH_SEGMENT)
            .pathSegment(contractType.name());

        return doPost(
            uriBuilder,
            () -> getHttpEntityWithJSON(contractMethodRequest),
            () -> typeReference
        );
    }

    public Optional<Boolean> isOwnerOfBatch(@NotNull ContractType contractType, @NotNull List<Long> batch) {
        return callContractMethod(
            contractType,
            new ContractMethodRequest()
                .setMethodName(ContractMethod.ERC721Method.IS_OWNER_OF_BATCH)
                .setMethodArgs(List.of(batch, SecurityUtils.getCurrentUserAddressStrict())),
            new ParameterizedTypeReference<>(){}
        );
    }

    public Optional<Long> getBalanceOf(@NotNull ContractType type, @NotNull String address) {
        return callContractMethod(
            type,
            new ContractMethodRequest()
                .setMethodName(ContractMethod.ERCCommon.BALANCE_OF)
                .setMethodArgs(List.of(address)),
            new ParameterizedTypeReference<>() {}
        );
    }

    public Optional<Long> getBalanceOf(@NotNull ContractType type, @NotNull String address, @NotNull Long tokenId) {
        return callContractMethod(
            type,
            new ContractMethodRequest()
                .setMethodName(ContractMethod.ERCCommon.BALANCE_OF)
                .setMethodArgs(List.of(address, tokenId)),
            new ParameterizedTypeReference<>() {}
        );
    }

    public Optional<Long> getNumberOfStakedMintpasses(@NotNull String address) {
        return callContractMethod(
            ContractType.MINTPASS_STAKING,
            new ContractMethodRequest()
                .setMethodName(ContractMethod.MintPassStakingMethod.NUMBER_OF_STAKED_PASSES_BY_WALLET)
                .setMethodArgs(List.of(address)),
            new ParameterizedTypeReference<>() {}
        );
    }

    public List<String> getTokensForType(@NotNull ContractType type, @NotNull String address) {
        return this.<List<String>>callContractMethod(
            type,
            new ContractMethodRequest()
                .setMethodName(ContractMethod.ERC721Method.TOKENS_OF_OWNER)
                .setMethodArgs(List.of(address)),
            new ParameterizedTypeReference<>() {}
        ).orElseGet(ArrayList::new);
    }

    public List<DepositRequest> getDepositRequests(@NotNull Long fromBlock) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder
            .fromUri(baseURI)
            .pathSegment(DEPOSIT_EVENTS_PATH_SEGMENT)
            .queryParam(FROM_BLOCK_QUERY_PARAM, fromBlock);
        return doGet(
            uriBuilder,
            Connector::getHttpEntity,
            () -> new ParameterizedTypeReference<List<DepositRequest>>() {}
        ).orElseGet(ArrayList::new);
    }

    public List<SpendingFinishedRequest> getSpendingEvents(@NotNull Long fromBlock, String path) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder
            .fromUri(baseURI)
            .pathSegment(path)
            .queryParam(FROM_BLOCK_QUERY_PARAM, fromBlock);
        return doGet(
            uriBuilder,
            Connector::getHttpEntity,
            () -> new ParameterizedTypeReference<List<SpendingFinishedRequest>>() {}
        ).orElseGet(ArrayList::new);
    }

    public List<SpendingFinishedRequest> getWithdrawRequests(@NotNull Long fromBlock) {
        return getSpendingEvents(fromBlock, WITHDRAW_EVENTS_PATH_SEGMENT);
    }

    public List<SpendingFinishedRequest> getMintWeaponsRequests(@NotNull Long fromBlock) {
        return getSpendingEvents(fromBlock, MINT_WEAPONS_EVENTS_PATH_SEGMENT);
    }

    public Boolean validateAddress(@NotNull String address) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder
            .fromUri(baseURI)
            .pathSegment(VALIDATE_ADDRESS_FORMAT_PATH_SEGMENT);
        return doPost(
            uriBuilder,
            () -> getHttpEntityWithJSON(new ValidateAddressRequest().setAddress(address)),
            () -> new ParameterizedTypeReference<Boolean>() {}
        ).orElse(false);
    }

    public String toWei(@NotNull Double amount) {
        return transformAmount(String.valueOf(amount), TO_WEI_PATH_SEGMENT);
    }

    public Double fromWei(@NotNull String amount) {
        return Double.parseDouble(transformAmount(amount, FROM_WEI_PATH_SEGMENT));
    }

    private String transformAmount(@NotNull String amount, @NotNull String endpoint) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUri(baseURI).pathSegment(endpoint);
        return doPost(
            uriBuilder,
            () -> getHttpEntityWithJSON(new TransformAmountRequest().setAmount(amount)),
            () -> new ParameterizedTypeReference<TransformAmountResponse>() {}
        ).map(TransformAmountResponse::getAmount).orElse(String.valueOf(0.));
    }

}
