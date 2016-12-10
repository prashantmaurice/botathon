'use strict';
var deferred = require('./utils/deferred');
var fn = require('./utils/functions');
var NetworkUtils = require('./utils/networkUtils');
const request = require('superagent');
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

    var messagingEvents = params.post.entry[0].messaging;

        messagingEvents.forEach(function(event){
            var sender = event.sender.id;
            if (event.postback) {
                const text = JSON.stringify(event.postback).substring(0, 200);
                sendTextMessage(sender, 'Postback received: ' + text);
            } else if (event.message && event.message.text) {
                const text = event.message.text.trim().substring(0, 200);

                if (text.toLowerCase() === 'generic') {
                    sendGenericMessage(sender);
                } else {
                    sendTextMessage(sender, 'Text received, echo: ' + text);
                }
            }
        });
    return deferred.success({});
};


function sendMessage (sender, message) {
    request
        .post('https://graph.facebook.com/v2.6/me/messages')
        .query({access_token: pageToken})
        .send({
            recipient: {
                id: sender
            },
            message: message
        })
        .end(function(err, res){
        if (err) {
            console.log('Error sending message: ', err);
        } else if (res.body.error) {
        console.log('Error: ', res.body.error);
    }
});
}

function sendTextMessage (sender, text) {
    sendMessage(sender, {
        text: text
    });
}

function sendGenericMessage (sender) {
    sendMessage(sender, {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [{
                    title: 'First card',
                    subtitle: 'Element #1 of an hscroll',
                    image_url: 'http://messengerdemo.parseapp.com/img/rift.png',
                    buttons: [{
                        type: 'web_url',
                        url: 'https://www.messenger.com/',
                        title: 'Web url'
                    }, {
                        type: 'postback',
                        title: 'Postback',
                        payload: 'Payload for first element in a generic bubble'
                    }]
                }, {
                    title: 'Second card',
                    subtitle: 'Element #2 of an hscroll',
                    image_url: 'http://messengerdemo.parseapp.com/img/gearvr.png',
                    buttons: [{
                        type: 'postback',
                        title: 'Postback',
                        payload: 'Payload for second element in a generic bubble'
                    }]
                }]
            }
        }
    });
}


module.exports = AlbumsAPI;
