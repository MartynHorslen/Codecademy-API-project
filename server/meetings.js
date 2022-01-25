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

  module.exports = meetingsRouter;