/**
 *      Contains all the data repos that we are using (can be either serving from mongoDb or mySQL)
 */

var mongodb_repos = require('./mongodb_repos');

var Repos = {
    usersRepo           :   mongodb_repos.Users
};

module.exports = Repos;