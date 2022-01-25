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

  
//Param matching for :id
minionsRouter.param('id', (req, res, next, id) => {
    const found = getFromDatabaseById('minions', id);
    if (found === -1){
        res.status(404).send();
    } else {
        req.minion = found;
        req.body.id = id;
        next();
    }
});

//GET /api/minions
minionsRouter.get('/', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    if (allMinions === -1){
        res.status(404).send();
    } else {
        res.status(200).send(allMinions);
    }
});

//GET /api/minions/:id
minionsRouter.get('/:id', (req, res, next) => {
    res.status(200).send(req.minion);
});

//POST & PUT minions validation
const validation = (req, res, next) => {
    const name = req.body.name;
    const title = req.body.title;
    const salary = Number(req.body.salary);
    const weaknesses = req.body.weaknesses;
    if (name === '' || title === '' || salary === '' || weaknesses === ''){
        res.status(400).send();
    } else {
        next();
    }
}

//POST /api/minions
minionsRouter.post('/', validation, (req, res, next) => {
    const createMinion = addToDatabase('minions', req.body);
    res.status(201).send(createMinion);
});

//PUT /api/minions
minionsRouter.put('/:id', validation, (req, res, next) => {
    const update = updateInstanceInDatabase('minions', req.body);
    res.status(200).send(req.body);
});

module.exports = minionsRouter;