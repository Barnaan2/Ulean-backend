const express = require('express');
const router = express.Router();
const { getCart, getCarts, createCart , updateCart, deleteCart} = require('./../controllers/cartController');

router.route('/')
.get(getCarts)
.post(createCart);

router.route('/:id')
.get(getCart)
.patch(updateCart)
.delete(deleteCart);

module.exports = router;