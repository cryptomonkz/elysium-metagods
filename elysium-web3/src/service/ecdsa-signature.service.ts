import { PRIVATE_KEY, web3HttpClient } from '../config/web3.config';

export const toWei = (amount?: number): string => web3HttpClient.utils.toWei((amount || 0).toString(), 'ether')

export const fromWei = (amount?: string): string => web3HttpClient.utils.fromWei((amount || '0'), 'ether')

export async function getClaimERC20RewardSignature(
  internalIdentifier: number, fromAddress: string, collectionAddress: string, amount: number,  walletAddress: string
) {
  const hashedContent = web3HttpClient.utils.soliditySha3(
    {t: 'uint256', v: internalIdentifier},
    {t: 'address', v: fromAddress},
    {t: 'address', v: collectionAddress},
    {t: 'uint256', v: amount},
    {t: 'address', v: walletAddress},
  )

  const signedPayload = await web3HttpClient.eth.accounts.sign(hashedContent, PRIVATE_KEY)
  return signedPayload.signature;
}

export async function getClaimERC721RewardSignature(
  internalIdentifier: number, fromAddress: string, collectionAddress: string, tokenId: number,  walletAddress: string
) {
  const hashedContent = web3HttpClient.utils.soliditySha3(
    {t: 'uint256', v: internalIdentifier},
    {t: 'address', v: fromAddress},
    {t: 'address', v: collectionAddress},
    {t: 'uint256', v: tokenId},
    {t: 'address', v: walletAddress},
  )

  const signedPayload = await web3HttpClient.eth.accounts.sign(hashedContent, PRIVATE_KEY)
  return signedPayload.signature;
}

export async function getClaimERC1155RewardSignature(
  internalIdentifier: number, fromAddress: string, collectionAddress, tokenId: number, amount: number, walletAddress: string
) {
  const hashedContent = web3HttpClient.utils.soliditySha3(
    {t: 'uint256', v: internalIdentifier},
    {t: 'address', v: fromAddress},
    {t: 'address', v: collectionAddress},
    {t: 'uint256', v: tokenId},
    {t: 'uint256', v: amount},
    {t: 'address', v: walletAddress},
  )

  const signedPayload = await web3HttpClient.eth.accounts.sign(hashedContent, PRIVATE_KEY)
  return signedPayload.signature;
}

export async function getWithdrawSignature(
  amount: string, walletAddress: string, internalIdentifier: number, generationDate: number
) {
  const hashedContent = web3HttpClient.utils.soliditySha3(
    {t: 'uint256', v: internalIdentifier},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: generationDate},
    {t: 'address', v: walletAddress},
  )

  const signedPayload = await web3HttpClient.eth.accounts.sign(hashedContent, PRIVATE_KEY)
  return signedPayload.signature;
}

export async function getMintWeaponsSignature(
  mintCount: number, walletAddress: string, internalIdentifier: number, generationDate: number, price: number
) {
  const hashedContent = web3HttpClient.utils.soliditySha3(
    {t: 'uint256', v: internalIdentifier},
    {t: 'uint256', v: mintCount},
    {t: 'uint256', v: price},
    {t: 'uint256', v: generationDate},
    {t: 'address', v: walletAddress},
  )

  const signedPayload = await web3HttpClient.eth.accounts.sign(hashedContent, PRIVATE_KEY)
  return signedPayload.signature;
}
