const express = require('express');
const req = require('express/lib/request');
const meetingsRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('./db.js');

//GET /api/meetings
meetingsRouter.get('/', (req, res, next) => {
    const allmeetings = getAllFromDatabase('meetings');
    if (allmeetings === -1){
        res.status(404).send();
    } else {
        res.status(200).send(allmeetings);
    }
});

//POST /api/meetings
meetingsRouter.post('/', (req, res, next) => {
    res.status(201).send(addToDatabase('meetings', createMeeting()));
});

meetingsRouter.delete('/', (req, res, next) => {
    const deleteAll = deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingsRouter;