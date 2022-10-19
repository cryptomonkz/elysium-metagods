const axios = require('axios').default;

export const WEB3_BASE_URL = process.env.WEB3_BASE_URL || '';
export const API_BASE_URL = process.env.API_BASE_URL || '';
export const WEB3_BASE_URL_INTEGRATION = process.env.WEB3_BASE_URL_INTEGRATION || '';
export const API_BASE_URL_INTEGRATION = process.env.API_BASE_URL_INTEGRATION || '';

export async function triggerDepositReconciliation() {
    try {

    await axios.post(`${API_BASE_URL}/api/public/job/deposit-reconciliation`);
    } catch (e) {
        console.error(`Failed to run triggerDepositReconciliation: ${e.message}`)
    }
    console.log(`Successfully finished triggerDepositReconciliation`);
}

export async function triggerWithdrawReconciliation() {
    try {

    await axios.post(`${API_BASE_URL}/api/public/job/withdraw-reconciliation`);
    } catch (e) {
        console.error(`Failed to run triggerWithdrawReconciliation: ${e.message}`)
    }
    console.log(`Successfully finished triggerWithdrawReconciliation`);
}

export async function triggerMintWeaponsReconciliation() {
    try {

    await axios.post(`${API_BASE_URL}/api/public/job/mint-weapons-reconciliation`);
    } catch (e) {
        console.error(`Failed to run triggerMintWeaponsReconciliation: ${e.message}`)
    }
    console.log(`Successfully finished triggerMintWeaponsReconciliation`);
}

export async function triggerTournamentQuestsProcessing() {
    try {

    await axios.post(`${API_BASE_URL}/api/public/job/tournament/process-quests`);
    } catch (e) {
        console.error(`Failed to run triggerTournamentQuestsProcessing: ${e.message}`)
    }
    console.log(`Successfully finished triggerTournamentQuestsProcessing`);
}

export async function triggerWSSReset() {
    try {

    await axios.post(`${WEB3_BASE_URL}/api/websocket/resetConnections`);
    } catch (e) {
        console.error(`Failed to run triggerWSSReset: ${e.message}`)
    }
    console.log(`Successfully finished triggerWSSReset`);
}

export async function triggerWeaponsTransfer() {
    try {

    await axios.post(`${WEB3_BASE_URL}/api/cron/transferWeapons`);
    } catch (e) {
        console.error(`Failed to run triggerWeaponsTransfer: ${e.message}`)
    }
    console.log(`Successfully finished triggerWeaponsTransfer`);
}
