const {
  getAllProducts,
  getProductById,
  getSuggestedProducts,
  getFeaturedProducts,
  getRelatedProducts,
  getProductsByCategory,
} = require('../models/productModels');

function fetchAllProducts() {
  return getAllProducts();
}

function fetchProductById(id) {
  return getProductById(id);
}

function fetchSuggestedProducts(limit = 5, randomize = true) {
  return getSuggestedProducts(limit, randomize);
}

function fetchFeaturedProducts(limit = 10) {
  return getFeaturedProducts(limit);
}

function fetchRelatedProducts(category, excludeId, limit = 4) {
  return getRelatedProducts(category, excludeId, limit);
}

function fetchProductsByCategory(category) {
  return getProductsByCategory(category);
}

module.exports = {
  fetchAllProducts,
  fetchProductById,
  fetchSuggestedProducts,
  fetchFeaturedProducts,
  fetchRelatedProducts,
  fetchProductsByCategory,
};