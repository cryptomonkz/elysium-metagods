import { firestore } from '../config/firestore.config';

const { Storage } = require('@google-cloud/storage');
const weaponService = require('./weapons-contract.service');

const WEAPONS_SYNC_DOCUMENT_ID = '0';

const WEAPONS_PUBLIC_BUCKET_NAME = `elysium-metagods-weapons`;
const WEAPONS_PRIVATE_BUCKET_NAME = `elysium-metagods-weapons-private`;
const WEAPONS_SYNC_COLLECTION = process.env.WEAPONS_SYNC_FIREBASE_COLLECTION || '';
const WEAPONS_IMAGES_FOLDER_NAME = process.env.WEAPONS_IMAGES_FOLDER_NAME || '';
const WEAPONS_IMAGES_SMALL_FOLDER_NAME = process.env.WEAPONS_IMAGES_SMALL_FOLDER_NAME || '';
const WEAPONS_METADATA_FOLDER_NAME = process.env.WEAPONS_METADATA_FOLDER_NAME || '';

export async function transferWeaponsWhenMinted(): Promise<void> {

  const weaponsSyncDocument = firestore.collection(WEAPONS_SYNC_COLLECTION).doc(WEAPONS_SYNC_DOCUMENT_ID);
  const syncedTokens = Number((await weaponsSyncDocument.get()).data().mintedTokens || '0');
  const mintedTokensFromContract = Number(await weaponService.totalSupply());

  if (syncedTokens >= mintedTokensFromContract) {
    return;
  }

  const storage = new Storage();
  const privateBucket = storage.bucket(WEAPONS_PRIVATE_BUCKET_NAME);
  try {
    for (let tokenId = syncedTokens; tokenId < mintedTokensFromContract; tokenId++) {

      console.log(
        `Transfer assets of weapon ${tokenId} from ` +
        `${WEAPONS_PRIVATE_BUCKET_NAME}/${WEAPONS_IMAGES_FOLDER_NAME}` +
        `to ${WEAPONS_PUBLIC_BUCKET_NAME}/${WEAPONS_METADATA_FOLDER_NAME}`,
      );

      const privateWeaponImage = await privateBucket.file(`${WEAPONS_IMAGES_FOLDER_NAME}/${tokenId}.png`);
      const privateWeaponImageSmall = await privateBucket.file(`${WEAPONS_IMAGES_SMALL_FOLDER_NAME}/${tokenId}.png`);
      const privateWeaponsMetadata = await privateBucket.file(`${WEAPONS_METADATA_FOLDER_NAME}/${tokenId}.json`);
      await privateWeaponImage.move(`gs://${WEAPONS_PUBLIC_BUCKET_NAME}/${WEAPONS_IMAGES_FOLDER_NAME}/${tokenId}.png`);
      await privateWeaponImageSmall.move(`gs://${WEAPONS_PUBLIC_BUCKET_NAME}/${WEAPONS_IMAGES_SMALL_FOLDER_NAME}/${tokenId}.png`);
      await privateWeaponsMetadata.move(`gs://${WEAPONS_PUBLIC_BUCKET_NAME}/${WEAPONS_METADATA_FOLDER_NAME}/${tokenId}.json`);

      await weaponsSyncDocument.set({ mintedTokens: tokenId + 1 });
    }
  } catch (e) {
    console.log('Error', e);
  }

  await weaponsSyncDocument.set({ mintedTokens: mintedTokensFromContract });

}
