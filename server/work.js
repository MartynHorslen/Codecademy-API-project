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
    const minionWork = work.filter(element => {
        return req.body.id == element.minionId;
    });
    res.status(200).send(minionWork);
});

//POST & PUT work validation
const validation = (req, res, next) => {
    const hours = Number(req.body.hours);
    if (!req.body || hours == 'NaN'){
        res.status(400).send();
    } else {
        next();
    }
}

//POST /api/minions/:minionId/work
workRouter.post('/', validation, (req, res, next) => {;
    const work = getAllFromDatabase('work');
    req.body.id = work.length + 1;
    const createWork = addToDatabase('work', req.body);
    res.status(201).send(createWork);
});

//PUT /api/minions/:minionId/work/:workId
workRouter.put('/:workid', (req, res, next) => {
    req.body.id = req.params.workid;
    const check = getFromDatabaseById('work', req.body.id);
    if (check === -1 || check === undefined) {
        res.status(400).send();
    } else {
        if (check.minionId == req.body.minionId){
            const updateWork = updateInstanceInDatabase('work', req.body);
            res.status(200).send(req.body);
        } else {
            res.status(400).send();
        }
    }
});

//DELETE /api/minions/:minionId/work/:workId
workRouter.delete('/:workid', (req, res, next) => {
    const deleteWork = deleteFromDatabasebyId('work', req.body.id);
    res.status(204).send();
});

module.exports = workRouter;