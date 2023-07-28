const express = require('express');
const { getWishlist, getWishlists, createWishlist , updateWishlist, deleteWishlist} = require('../controllers/wishlistController');
const router = express.Router();


router.route('/')
.get(getWishlists)
.post(createWishlist);


router.route('/:id')
.get(getWishlist)
.patch(updateWishlist)
.delete(deleteWishlist);

module.exports = router;