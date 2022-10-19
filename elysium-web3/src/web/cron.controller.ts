import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { transferWeaponsWhenMinted } from '../service/transfer-weapons-at-mint.service';

const router = Router();

router.post('/transferWeapons', async (_, res) => {
  try {
    await transferWeaponsWhenMinted();
    return res.sendStatus(StatusCodes.OK);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
});

module.exports = router;
