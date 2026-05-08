const { fetchProductById } = require('../services/productService');

function initCart(req) {
  if (!req.session.cart) {
    req.session.cart = [];
  }
}

function getCart(req, res) {
  initCart(req);

  const cartItems = req.session.cart.map((item) => {
    const product = fetchProductById(item.productId);
    return {
      productId: item.productId,
      quantity: item.quantity,
      name: product.name,
      price: product.price,
      image: product.image,
      subtotal: product.price * item.quantity,
    };
  });

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  res.render('pages/cart', { title: 'Carrito', cartItems, total });
}

function addToCart(req, res) {
  initCart(req);

  const productId = Number(req.body.productId);
  const product = fetchProductById(productId);

  if (!product) return res.redirect('/index');

  const existing = req.session.cart.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    req.session.cart.push({ productId, quantity: 1 });
  }

  res.redirect('/cart');
}

function increaseQuantity(req, res) {
  initCart(req);

  const productId = Number(req.body.productId);
  const item = req.session.cart.find((i) => i.productId === productId);

  if (item) item.quantity += 1;

  res.redirect('/cart');
}

function decreaseQuantity(req, res) {
  initCart(req);

  const productId = Number(req.body.productId);
  const index = req.session.cart.findIndex((i) => i.productId === productId);

  if (index !== -1) {
    req.session.cart[index].quantity -= 1;
    if (req.session.cart[index].quantity <= 0) {
      req.session.cart.splice(index, 1);
    }
  }

  res.redirect('/cart');
}

function clearCart(req, res) {
  req.session.cart = [];
  res.redirect('/cart');
}

module.exports = { getCart, addToCart, increaseQuantity, decreaseQuantity, clearCart };