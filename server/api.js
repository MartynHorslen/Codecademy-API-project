const express = require('express');
const apiRouter = express.Router();

//Require a minions, ideas & meetings router
const minionsRouter = require('./minions.js');
const ideasRouter = require('./ideas.js');
const meetingsRouter = require('./meetings.js');

//Mount the minions, ideas & meetings routers
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
