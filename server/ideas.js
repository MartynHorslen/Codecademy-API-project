const express = require('express');
const req = require('express/lib/request');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');
const ideasRouter = express.Router();
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
ideasRouter.param('id', (req, res, next, id) => {
    const testNumber = Number(id);
    if (testNumber == 'NaN'){
        res.status(400).send();
    } else {
        const found = getFromDatabaseById('ideas', id);
        if (found === -1 || !found){
            res.status(404).send();
        } else {
            req.idea = found;
            req.body.id = id;
            next();
        }
    }
});

//GET /api/ideas
ideasRouter.get('/', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    if (allIdeas === -1){
        res.status(404).send();
    } else {
        res.status(200).send(allIdeas);
    }
});

//GET /api/ideas/:id
ideasRouter.get('/:id', (req, res, next) => {
    res.status(200).send(req.idea);
});

//POST & PUT idea validation
const validation = (req, res, next) => {
    const name = req.body.name;
    const revenue = Number(req.body.weeklyRevenue);
    const weeks = Number(req.body.numWeeks);
    if (!req.body || name == '' || revenue == 'NaN' || weeks == 'NaN'){
        res.status(400).send();
    } else {
        next();
    }
}

//POST /api/ideas
ideasRouter.post('/', validation, checkMillionDollarIdea, (req, res, next) => {
    const createIdea = addToDatabase('ideas', req.body);
    res.status(201).send(createIdea);
});

//PUT /api/ideas/:id
ideasRouter.put('/:id', validation, (req, res, next) => {
    const updateIdea = updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(updateIdea);
});

//DELETE /api/ideas/:id
ideasRouter.delete('/:id', (req, res, next) =>{
    const deleteIdea = deleteFromDatabasebyId('ideas', req.body.id);
    res.status(204).send();
});

module.exports = ideasRouter;