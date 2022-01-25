const express = require('express');
const req = require('express/lib/request');
const { type } = require('express/lib/response');
const workRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('./db.js');

//GET /api/minions/:minionId/work
workRouter.get('/', (req, res, next) => {
    const work = getAllFromDatabase('work');
    const minionWork = [];
    minionWork.push(work.find(element => {
        return req.body.id == element.minionId;
    }));
    res.status(200).send(minionWork);
});

module.exports = workRouter;