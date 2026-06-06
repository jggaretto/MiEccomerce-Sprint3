const express = require('express');
const {
  getIndex,
  getProductDetail,
  getCategory,
  getProductList,
  searchProducts,
} = require('../controllers/productControllers');

const router = express.Router();

router.get('/index', getIndex);
router.get('/search', searchProducts);
router.get('/categories/:category', getCategory);
router.get('/products', getProductList);
router.get('/products/:id', getProductDetail);

module.exports = router;
