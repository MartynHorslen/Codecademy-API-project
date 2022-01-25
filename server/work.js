const express = require('express');
const req = require('express/lib/request');
const { type } = require('express/lib/response');
const workRouter = express.Router();

//GET /api/minions/:minionId/work
workRouter.get('/', (req, res, next) => {
    console.log(req.body.id);
});

module.exports = workRouter;