'use strict';
var deferred = require('./utils/deferred');
var fn = require('./utils/functions');
var NetworkUtils = require('./utils/networkUtils');
var repos = require('./repo/repos.js');

function AlbumsAPI() {}

AlbumsAPI.prototype.getMyAlbumsAPI = function(params ){
    console.log('getMyAlbumsAPI params: ', params);
    return fn.defer( fn.bind( repos.usersRepo, 'getAllUsers') )({}).pipe(function( albumObjs ) {
        return deferred.success({params : params,working :true,albumObjs:albumObjs} );
    });
};


module.exports = AlbumsAPI;
