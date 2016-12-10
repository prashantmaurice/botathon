var express = require('express');
var mobile = require('./mobile');

var allRoutes = function (app) {
    app.use('/', express.Router().get('/', function (req, res) {
        res.send({status : "Honey bee Backend working perfectly...!"});
    }));

    app.use('/message', mobile);
};


module.exports = allRoutes;