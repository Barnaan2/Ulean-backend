const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    course:{
        // this should be list of id number of courses.
            type:[String],
            required:[true,"A course should exist to create cart"]   
    },
    user:{
        type:String,
        required:[true,"A user should be added"]
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
});

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;