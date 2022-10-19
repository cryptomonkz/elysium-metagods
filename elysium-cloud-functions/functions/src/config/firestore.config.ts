import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

export function initFirestore() {

  admin.initializeApp();

  const firestore = admin.firestore();

  fireorm.initialize(firestore);

}
