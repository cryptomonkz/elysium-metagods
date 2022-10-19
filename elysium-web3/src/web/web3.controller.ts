import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ContractType } from '../model/ContractType';
import { TokenStandard } from '../model/TokenStandard';
import {fromWei, toWei} from '../service/ecdsa-signature.service';
import { extractDepositDetails, extractSpendingDetails, TOKEN_EVENT } from '../service/token-contract.service';

const Web3 = require('web3');

const ecdsaSignatureService = require('../service/ecdsa-signature.service');
const godsContractService = require('../service/gods-contract.service')
const weaponsContractService = require('../service/weapons-contract.service')
const tokenContractService = require('../service/token-contract.service')
const mintpassContractService = require('../service/mintpass-contract.service')
const mintpassStakingContractService = require('../service/mintpass-staking-contract.service')

const router = Router();

router.post('/recoverPersonalSignature', (req, res) => {
  const data = req.body.data;
  const signature = req.body.signature;

  res.json({signerWallet: recoverPersonalSignature({data: Web3.utils.utf8ToHex(data.toString()), signature})});
});

router.post('/signWithdrawRequest', async (req, res) => {
  try {
    const signature = await ecdsaSignatureService.getWithdrawSignature(
      req.body.amount || '0',
      req.body.walletAddress || '',
      req.body.internalIdentifier || 0,
      req.body.generationDate || 0,
    );
    return res.send({ signature });
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
});

router.post('/signClaimRewardRequest', async (req, res) => {
  try {
    const requestIdentifier: number = req.body.requestIdentifier || 0;
    const tokenStandard: TokenStandard = TokenStandard[req.body.tokenStandard || ''];
    const fromAddress: string = req.body.fromAddress || '';
    const collectionAddress: string = req.body.collectionAddress || '';
    const tokenId: number = req.body.tokenId || 0;
    const amount: number = req.body.amount || 0;
    const walletAddress: string = req.body.walletAddress || '';

    let signature;
    switch (tokenStandard) {
      case TokenStandard.ERC20:
        signature = await ecdsaSignatureService.getClaimERC20RewardSignature(requestIdentifier, fromAddress, collectionAddress, amount, walletAddress);
        break;
      case TokenStandard.ERC721:
        signature = await ecdsaSignatureService.getClaimERC721RewardSignature(requestIdentifier, fromAddress, collectionAddress, tokenId, walletAddress);
        break;
      case TokenStandard.ERC1155:
        signature = await ecdsaSignatureService.getClaimERC1155RewardSignature(requestIdentifier, fromAddress, collectionAddress, tokenId, amount, walletAddress);
        break;
      default:
        throw Error(`Invalid token standard provided ${tokenStandard}`)
    }

    return res.send({ signature });
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
});

router.post('/signMintWeaponsRequest', async (req, res) => {
  try {
    const signature = await ecdsaSignatureService.getMintWeaponsSignature(
      req.body.mintCount || 0,
      req.body.walletAddress || '',
      req.body.internalIdentifier || 0,
      req.body.generationDate || 0,
      req.body.price || 0,
    );
    return res.send({ signature });
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
});

router.post('/toWei', async (req, res) => {
  try {
    return res.send({ amount: toWei(req.body.amount) });
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
});

router.post('/fromWei', async (req, res) => {
  try {
    return res.send({ amount: fromWei(req.body.amount) });
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
});

router.post('/validateAddressFormat', async (req, res) => {
  try {
    return res.send(Web3.utils.isAddress(req.body.address));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
});

router.post('/contract/:contractName', async (req, res) => {

  try {
    const contractName = req.params.contractName;
    const methodName = req.body.methodName;
    const args = req.body.methodArgs;

    let methodResponse;
    switch (contractName) {
      case ContractType.GOD:
        methodResponse = await godsContractService.callMethod(methodName, args);
        break;
      case ContractType.WEAPON:
        methodResponse = await weaponsContractService.callMethod(methodName, args);
        break;
      case ContractType.TOKEN:
        methodResponse = await tokenContractService.callMethod(methodName, args);
        break;
      case ContractType.MINTPASS:
        methodResponse = await mintpassContractService.callMethod(methodName, args);
        break;
      case ContractType.MINTPASS_STAKING:
        methodResponse = await mintpassStakingContractService.callMethod(methodName, args);
        break;
      default:
        return res.status(StatusCodes.BAD_REQUEST).send("Unsupported contract name provided");
    }

    res.setHeader('Content-Type', 'application/json');

    return res.send(methodResponse);
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
})

router.get('/depositEvents', async (req, res) => {
  try {
    const fromBlock = req.query.fromBlock;
    const pastDeposits = await tokenContractService.getTokenEventsFromBlock(TOKEN_EVENT.DEPOSIT, fromBlock);
    return res.send((pastDeposits || []).map(extractDepositDetails));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
})

const extractSpendingEvents = async (req, res, contract, event) => {
  try {
    const fromBlock = req.query.fromBlock;
    const pastDeposits = await contract.getTokenEventsFromBlock(event, fromBlock);
    return res.send((pastDeposits || []).map(extractSpendingDetails));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
}

router.get('/withdrawEvents', async (req, res) => {
  return (await extractSpendingEvents(req, res, tokenContractService, TOKEN_EVENT.WITHDRAW))
})

router.get('/mintWeaponsEvents', async (req, res) => {
  return (await extractSpendingEvents(req, res, weaponsContractService, TOKEN_EVENT.MINT_WEAPONS))
})

module.exports = router;
