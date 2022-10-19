import {
  HANDLE_DEPOSIT_ENDPOINT,
  HANDLE_MINT_WEAPONS_ENDPOINT,
  HANDLE_WITHDRAW_ENDPOINT
} from "../config/processingService.config";
import {extractDepositDetails, extractSpendingDetails} from "./token-contract.service";

const axios = require('axios').default;

export const triggerHandleDeposit = async (depositRequest) => {
  try {
    const depositDetails = extractDepositDetails(depositRequest)
    console.log(
      `A deposit request was received for <${depositDetails.walletAddress}> ` +
      `on the amount of <${depositDetails.amount}>`
    )
    const response = await axios.post(HANDLE_DEPOSIT_ENDPOINT, depositDetails)
    console.log(
      `The deposit request was successfully handled for <${depositDetails.walletAddress}> ` +
      `on the amount of <${depositDetails.amount}> with status code <${response.status}>`
    )
  } catch (err) {
    console.error('Deposit handling failed for request', depositRequest, err)
  }
}

export const triggerHandleWithdraw = async (withdrawRequest) => {
  try {
    const withdrawDetails = extractSpendingDetails(withdrawRequest)
    console.log(
      `A withdrawal request was received for <${withdrawDetails.walletAddress}>: ` +
      `identifier <${withdrawDetails.requestIdentifier}> and success status <${withdrawDetails.wasRequestSuccessful}>`
    )
    const response = await axios.post(HANDLE_WITHDRAW_ENDPOINT, withdrawDetails)
    console.log(
      `The withdrawal request with identifier <${withdrawDetails.requestIdentifier}> was successfully handled ` +
      `for <${withdrawDetails.walletAddress}> with status code <${response.status}>`
    )
  } catch (err) {
    console.error('Withdrawal handling failed for request', withdrawRequest, err)
  }
}

export const triggerHandleMintWeapons = async (mintWeaponsRequest) => {
  try {
    const mintWeaponsDetails = extractSpendingDetails(mintWeaponsRequest)
    console.log(
      `A mint weapons request was received for <${mintWeaponsDetails.walletAddress}>: ` +
      `identifier <${mintWeaponsDetails.requestIdentifier}> and success status <${mintWeaponsDetails.wasRequestSuccessful}>`
    )
    const response = await axios.post(HANDLE_MINT_WEAPONS_ENDPOINT, mintWeaponsDetails)
    console.log(
      `The mint weapons request with identifier <${mintWeaponsDetails.requestIdentifier}> was successfully handled ` +
      `for <${mintWeaponsDetails.walletAddress}> with status code <${response.status}>`
    )
  } catch (err) {
    console.error('Mint weapons handling failed for request', mintWeaponsRequest, err)
  }
}
