/**
 * Created by maurice on 18/05/15.
 */

var mongoose = require('mongoose');
var dbConfig = require('config').mongodbConfig;
var underscore = require('underscore');

mongoose.connect('mongodb://' + dbConfig.host + '/' + dbConfig.database,function(err,res){
    if(err) console.logger.error("Mongo connection error :",err);
    else console.log("Mongo successfully connected at "+"mongodb://" + dbConfig.host + '/' + dbConfig.database);
});

mongoose.connection.on('error', function(err) {
    console.logger.error("MONGO ERROR1:",err);
});


//Entity Models
var users_repo = require('./mongo/user_repo')(mongoose);

exports.Users = mongoose.model('Users', users_repo);