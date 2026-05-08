const {
  getCartItems,
  calculateTotal,
  addProduct,
  increaseProduct,
  decreaseProduct,
  clearCart,
} = require('../service/cartService');

function getCart(req, res) {
  const cartItems = getCartItems(req.session);
  const total = calculateTotal(cartItems);
  res.render('pages/cart', { title: 'Carrito', cartItems, total });
}

function addToCart(req, res) {
  const productId = Number(req.body.productId);
  const added = addProduct(req.session, productId);

  if (!added) return res.redirect('/index');

  res.redirect('/cart');
}

function increaseQuantity(req, res) {
  const productId = Number(req.body.productId);
  increaseProduct(req.session, productId);
  res.redirect('/cart');
}

function decreaseQuantity(req, res) {
  const productId = Number(req.body.productId);
  decreaseProduct(req.session, productId);
  res.redirect('/cart');
}

function emptyCart(req, res) {
  clearCart(req.session);
  res.redirect('/cart');
}

module.exports = { getCart, addToCart, increaseQuantity, decreaseQuantity, emptyCart };