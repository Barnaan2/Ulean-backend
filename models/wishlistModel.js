const mongoose = require('mongoose');


// here also some datatypes should be relplaced.
const wishlistSchema = new mongoose.Schema({
    user:{
        type:String,
        required:[true,'A wishlist should belong to a user']
    },

    course:{
        type:[String],
        required:[true,'A wishlist should have  courses']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }

})

const Wishlist = mongoose.model('Wishlist',wishlistSchema);
module.exports = Wishlist;