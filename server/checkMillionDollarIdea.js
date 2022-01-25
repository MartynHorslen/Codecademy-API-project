const checkMillionDollarIdea = (req, res, next) => {
    console.log('million dollar idea check');
    const revenue = req.body.weeklyRevenue * req.body.numWeeks;
    if (revenue >= 1000000){
        next();
    } else {
        res.status(400).send();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
