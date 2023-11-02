var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.productdata = new Schema({
    title:String,
    description: String,
    producttype:String,
    rating:Number
}, {
    collection: 'productdata'
});