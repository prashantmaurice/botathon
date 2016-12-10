'use strict';

var deferred = require('./deferred.js'),
    _ = require('underscore');

function NetworkUtils() {}


function fetchRequestParams( req ){
    var params = {};
    if( req.method.toLowerCase() === 'get' ){ params = _.extend(req.params, req.query); params.post = {} }
    if( req.method.toLowerCase() === 'post' ){ params = _.extend(req.params, req.query); params.post = req.body; }
    if( req.method.toLowerCase() === 'put' ){ params = _.extend(req.params, req.query); params.post = req.body; }
    if( req.method.toLowerCase() === 'delete' ){ params = _.extend(req.params, req.query); params.post = req.body; }
    return params;
}

NetworkUtils.processForData = function( req, res, apiMethod){ //use this to reply to all API requests
    process(req,res,apiMethod,function(result){
        res.status(200).send(result);
    });
};
NetworkUtils.processForStream = function( req, res, apiMethod){ //use this to reply to all API requests
    process(req,res,apiMethod,function(stream){
        stream.pipe(res);
    });
};

function process(req, res, apiMethod, successCb){
    var params = fetchRequestParams(req);
    try {
        apiMethod(params)
            .success(function (result) {
                successCb(result);
            })
            .failure(function (error) {
                if(error.code) res.status(error.code).send({failure : error.msg});
                else res.status(500).send(error);
            });
    } catch(err) {
        console.logger.error("Unhandled Error : "+err);
    }
}

NetworkUtils.successResponse = function(data){ //use this to reply to all API requests
    return deferred.success(data);
};
NetworkUtils.failureResponse = function(error){ //use this to reply to all API requests
    return deferred.failure(error);
};

NetworkUtils.ErrCode = {
    NO_IMAGE_AT_SRC : {
        code : 404,
        msg : "No image at source"
    }
};



module.exports = NetworkUtils;