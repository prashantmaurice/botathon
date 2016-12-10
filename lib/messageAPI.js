'use strict';
var deferred = require('./utils/deferred');
var fn = require('./utils/functions');
var NetworkUtils = require('./utils/networkUtils');
// var repos = require('./repo/repos.js');

var verifyToken = "botathon_token";

function AlbumsAPI() {}

AlbumsAPI.prototype.getMyAlbumsAPI = function(params ){
    console.log('getMyAlbumsAPI params: ', params);
    // return fn.defer( fn.bind( repos.usersRepo, 'getAllUsers') )({}).pipe(function( albumObjs ) {


        // return deferred.success({params : params,working :true,albumObjs:albumObjs} );
    // });

    if (params.post['hub.verify_token'] === verifyToken) {
        return deferred.success(params.post['hub.challenge']);
    }
    return deferred.failure('Error, wrong validation token');

};


AlbumsAPI.prototype.postFromWebHook = function(params ){
    console.log('postFromWebHook params: ', JSON.stringify(params));

    // var messagingEvents = params.post.entry[0].messaging;
    //
    //     messagingEvents.forEach(function(event){
    //         const sender = event.sender.id;
    //
    //     if (event.postback) {
    //         const text = JSON.stringify(event.postback).substring(0, 200);
    //         sendTextMessage(sender, 'Postback received: ' + text);
    //     } else if (event.message && event.message.text) {
    //         const text = event.message.text.trim().substring(0, 200);
    //
    //         if (text.toLowerCase() === 'generic') {
    //             sendGenericMessage(sender);
    //         } else {
    //             sendTextMessage(sender, 'Text received, echo: ' + text);
    //         }
    //     }
    // });
    //
    // return deferred.setDefaultMonitor()
    //
    // res.sendStatus(200);


    // if (params.post['hub.verify_token'] === verifyToken) {
    //     return deferred.success(params.post['hub.challenge']);
    // }
    return deferred.success('Received Message : '+params);

};



module.exports = AlbumsAPI;
