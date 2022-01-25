const express = require('express');
const req = require('express/lib/request');
const minionsRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('./db.js');

//GET /api/minions
minionsRouter.get('/', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    if (allMinions === -1){
        res.status(404).send();
    } else {
        console.log(allMinions);
        res.status(200).send(allMinions);
    }
});

//GET /api/minions/:id
minionsRouter.get('/:id', (req, res, next) => {
    const found = getFromDatabaseById('minions', req.params.id);
    if (found === -1){
        res.status(404).send();
    } else {
        console.log(found);
        res.status(200).send(found);
    }
});


module.exports = minionsRouter;