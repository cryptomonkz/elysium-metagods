import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

export let firestore: any;

export function initializeFirestore() {

  admin.initializeApp();

  firestore = admin.firestore();

  fireorm.initialize(firestore);

}
