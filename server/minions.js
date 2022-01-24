const express = require('express');
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


module.exports = minionsRouter;