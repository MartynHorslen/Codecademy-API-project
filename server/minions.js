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
//minionsRouter.use('id', (req, res, next, id) => {});

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
    const found = getFromDatabaseById('minions', req.params.id);
    if (found === -1){
        res.status(404).send();
    } else {
        res.status(200).send(found);
    }
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
    console.log('PUT');
});

module.exports = minionsRouter;