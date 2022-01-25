const express = require('express');
const req = require('express/lib/request');
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

//GET /api/ideas
ideasRouter.get('/', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    if (allIdeas === -1){
        res.status(404).send();
    } else {
        res.status(200).send(allIdeas);
    }
});


  module.exports = ideasRouter;