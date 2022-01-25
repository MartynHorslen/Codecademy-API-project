const express = require('express');
const req = require('express/lib/request');
const { type } = require('express/lib/response');
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

//Require minions work router
const workRouter = require('./work.js');

//Mount work router
minionsRouter.use('/:id/work', workRouter);

//Param matching for :id
minionsRouter.param('id', (req, res, next, id) => {
    const testNumber = Number(id);
    if (testNumber == 'NaN'){
        res.status(400).send();
    } else {
        const found = getFromDatabaseById('minions', id);
        if (found === -1 || !found){
            res.status(404).send();
        } else {
            req.minion = found;
            req.body.id = id;
            next();
        }
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
    const salary = Number(req.body.salary);
    if (!req.body || salary == 'NaN'){
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

//PUT /api/minions/:id
minionsRouter.put('/:id', validation, (req, res, next) => {
    const updateMinion = updateInstanceInDatabase('minions', req.body);
    res.status(200).send(updateMinion);
});

//DELETE /api/minions/:id
minionsRouter.delete('/:id', (req, res, next) =>{
    const deleteMinion = deleteFromDatabasebyId('minions', req.body.id);
    res.status(204).send();
});

module.exports = minionsRouter;