import * as functions from 'firebase-functions';
import { initDotenv } from './config/dotenv.config';
import { initFirestore } from './config/firestore.config';

initFirestore();
initDotenv();

const stakingReconciliationCron = require('./cron/staking-reconciliation.cron');

exports.triggerDepositReconciliation = functions
    .runWith({ timeoutSeconds: 60 })
    // At minute 15
    .pubsub.schedule('15 * * * *')
    .onRun(async context => {
            await stakingReconciliationCron.triggerDepositReconciliation();
        },
    );

exports.triggerWithdrawReconciliation = functions
    .runWith({ timeoutSeconds: 60 })
    // At minute 35
    .pubsub.schedule('35 * * * *')
    .onRun(async context => {
            await stakingReconciliationCron.triggerWithdrawReconciliation();
        },
    );

exports.triggerMintWeaponsReconciliation = functions
    .runWith({ timeoutSeconds: 60 })
    // At minute 25
    .pubsub.schedule('25 * * * *')
    .onRun(async context => {
            await stakingReconciliationCron.triggerMintWeaponsReconciliation();
        },
    );

exports.triggerTournamentQuestsProcessing = functions
    .runWith({ timeoutSeconds: 60 })
    // “At minute 0 and 5 past hour 9 on every day-of-month from 14 through 20 in July.”
    .pubsub.schedule('0,5 9 14-20 7 *')
    .timeZone("Etc/UTC")
    .onRun(async context => {
            await stakingReconciliationCron.triggerTournamentQuestsProcessing();
        },
    );
exports.triggerTournamentQuestsProcessingForFirstPeriod = functions
    .runWith({ timeoutSeconds: 60 })
    // “At 08:55 on day-of-month 14 in July.”
    .pubsub.schedule('55 8 14 7 *')
    .timeZone("Etc/UTC")
    .onRun(async context => {
            await stakingReconciliationCron.triggerTournamentQuestsProcessing();
        },
    );

exports.triggerWeaponsTransferSync = functions
    .runWith({ timeoutSeconds: 540 })
    .pubsub.schedule('* * * * *')
    .onRun(async context => {
            await stakingReconciliationCron.triggerWeaponsTransfer();
        },
    );

exports.triggerWSSReset = functions
    .runWith({ timeoutSeconds: 60 })
    // At minute 5, 25, and 45
    .pubsub.schedule('5,25,45 * * * *')
    .onRun(async context => {
            await stakingReconciliationCron.triggerWSSReset();
        },
    );
