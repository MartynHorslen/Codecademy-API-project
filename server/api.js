const express = require('express');
const apiRouter = express.Router();

//Require a minions router
const minionsRouter = require('minions.js');

//Mount the minions router
apiRouter.use('/minions', minionsRouter);

module.exports = apiRouter;
