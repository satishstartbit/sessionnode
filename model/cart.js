var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.cart = new Schema({
    productid:{
        type:Schema.Types.ObjectId,
        ref:"productdata"
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:"registerusers"
    }
}, {
    collection: 'cart'
});