const express = require('express');
const {
  getCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} = require('../controllers/cartController');

const router = express.Router();

router.get('/cart', getCart);
router.post('/cart/add', addToCart);
router.post('/cart/increase', increaseQuantity);
router.post('/cart/decrease', decreaseQuantity);
router.post('/cart/clear', emptyCart);

module.exports = router;
