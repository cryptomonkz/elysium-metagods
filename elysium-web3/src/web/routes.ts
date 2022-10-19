
export const setupRoutes = app => {

  app.use('/api/web3', require('./web3.controller'));
  app.use('/api/websocket', require('./websocket.controller'));
  app.use('/api/cron', require('./cron.controller'));

  app.route('/*').get((_, res) => res.status(404).end());
}
