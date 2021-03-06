var express = require('express');
var router = express.Router();
var repos = require('../lib/repo/repos');
var fn = require('../lib/utils/functions');
var deferred = require('../lib/utils/deferred');


var messageAPI = new (require('../lib/messageAPI.js'))();


function callAPI(req, res, apiMethod) {
    var params = {};
    if (req.method.toLowerCase() === 'get') { params = req.params; params.post = req.query; }
    if (req.method.toLowerCase() === 'post') { params = req.params; params.post = req.body; }
    if (req.method.toLowerCase() === 'put') { params = req.params; params.post = req.body; }
    if (req.method.toLowerCase() === 'delete') { params = req.params; params.post = req.body; }


    try{
        apiMethod(params)
            .success(function (result) {
                res.status(200).send(result);
            })
            .failure(function (error, statusCode) {
                error.statusCode = 500;
                console.logger.error(error);
                res.status(error.statusCode).send(error);
            });

    } catch(err) {
        console.logger.error("BASE", err);
        res.status(501).send(err);
    }
}


router.get('/test', function(req, res) {
    callAPI(req, res, messageAPI.getMyAlbumsAPI);
});

router.post('/test', function(req, res) {
    callAPI(req, res, messageAPI.postFromWebHook);
});


module.exports = router;