var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.registeruser = new Schema({
    name:String,
    email: String,
    password:String
}, {
    collection: 'registerusers'
});