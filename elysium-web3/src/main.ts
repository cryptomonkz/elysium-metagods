import { initDotenv } from './config/dotenv.config';
import { initializeFirestore } from './config/firestore.config';
import { setupRoutes } from './web/routes';

initDotenv();
initializeFirestore();

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(bodyParser.json())

app.use(cors({
  origin: [
    'https://www.elysiummetagods.com',
    'https://elysiummetagods.com',
    'https://www.world.elysiummetagods.com',
    'https://world.elysiummetagods.com'
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

setupRoutes(app);

app.listen(process.env.PORT || 8889,
  () => {
  console.log(`Express server listening on ${process.env.PORT || 8889}`)
  },
);
