import {Router} from 'express';
import {StatusCodes} from "http-status-codes";
import {initializeSubscriptions} from "../service/websocket.service";

const router = Router();

router.post('/resetConnections', async (_, res) => {
  try {
    initializeSubscriptions()
    return res.sendStatus(StatusCodes.OK);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
});

module.exports = router;
