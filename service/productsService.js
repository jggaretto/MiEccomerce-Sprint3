const db = require('../db/database');

function fetchAllProducts() {
  return db.prepare('SELECT * FROM products').all();
}

function fetchProductById(id) {
  return db.prepare('SELECT * FROM products WHERE id = ?').get(id) || null;
}

function fetchSuggestedProducts(limit = 5, randomize = true) {
  const order = randomize ? 'ORDER BY RANDOM()' : '';
  return db.prepare(`SELECT * FROM products ${order} LIMIT ?`).all(limit);
}

function fetchFeaturedProducts(limit = 10) {
  return db.prepare(
    'SELECT * FROM products WHERE featured = 1 ORDER BY RANDOM() LIMIT ?'
  ).all(limit);
}

function fetchRelatedProducts(category, excludeId, limit = 4) {
  if (!category) return [];
  return db.prepare(
    'SELECT * FROM products WHERE category = ? AND id != ? ORDER BY RANDOM() LIMIT ?'
  ).all(category, excludeId, limit);
}

function fetchProductsByCategory(category) {
  return db.prepare(
    'SELECT * FROM products WHERE LOWER(category) = LOWER(?)'
  ).all(category);
}

function fetchProductsByName(query) {
  return db.prepare(
    "SELECT * FROM products WHERE LOWER(name) LIKE '%' || LOWER(?) || '%'"
  ).all(query);
}

function fetchProductsSorted(sort) {
  if (sort === 'asc') {
    return db.prepare('SELECT * FROM products ORDER BY price ASC').all();
  }
  if (sort === 'desc') {
    return db.prepare('SELECT * FROM products ORDER BY price DESC').all();
  }
  return db.prepare('SELECT * FROM products').all();
}

// DESPUÉS:
function normalizeId(id) {
  if (!/^\d+$/.test(String(id))) return { status: 400, product: null };
  const numId = parseInt(id, 10);
  const product = fetchProductById(numId);
  if (!product) return { status: 404, product: null };
  return { status: 200, product };
}

module.exports = {
  fetchAllProducts,
  fetchProductById,
  fetchSuggestedProducts,
  fetchFeaturedProducts,
  fetchRelatedProducts,
  fetchProductsByCategory,
  fetchProductsByName,
  fetchProductsSorted,
  normalizeId,
};
