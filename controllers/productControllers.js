const {
  fetchSuggestedProducts,
  fetchFeaturedProducts,
  fetchProductById,
  fetchRelatedProducts,
  fetchProductsByCategory,
  fetchProductsSorted,
} = require('../service/productsService');

function getIndex(req, res) {
  const suggestedProducts = fetchSuggestedProducts(5, true);
  const featuredProducts  = fetchFeaturedProducts(10);
  res.render('pages/index', { title: 'Inicio', suggestedProducts, featuredProducts });
}

function getProductDetail(req, res) {
  const product = fetchProductById(req.params.id);

  if (!product) {
    return res.status(404).render('pages/error404', { title: 'Producto no encontrado' });
  }

  const related = fetchRelatedProducts(product.category, product.id, 4);
  res.render('pages/product', { title: product.name, product, related });
}

// ─── US10: listado por categoría ──────────────────────────────────────────────
function getCategory(req, res) {
  const category = req.params.category;
  const products = fetchProductsByCategory(category);

  res.render('pages/category', {
    title: `Categoría: ${category}`,
    category,
    products,
  });
}

function getProductList(req, res) {
  const sort = req.query.sort;
  const products = fetchProductsSorted(sort);
  res.render('pages/productList', { title: 'Productos', products, sort });
}

module.exports = { getIndex, getProductDetail, getCategory, getProductList };