const { fetchProductById } = require('./productsService');

function initCart(session) {
  if (!session.cart) {
    session.cart = [];
  }
}

function getCartItems(session) {
  initCart(session);

  return session.cart.map((item) => {
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
}

function calculateTotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.subtotal, 0);
}

function addProduct(session, productId) {
  initCart(session);

  const product = fetchProductById(productId);
  if (!product) return false;

  const existing = session.cart.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    session.cart.push({ productId, quantity: 1 });
  }

  return true;
}

function increaseProduct(session, productId) {
  initCart(session);

  const item = session.cart.find((i) => i.productId === productId);
  if (item) item.quantity += 1;
}

function decreaseProduct(session, productId) {
  initCart(session);

  const index = session.cart.findIndex((i) => i.productId === productId);

  if (index !== -1) {
    session.cart[index].quantity -= 1;
    if (session.cart[index].quantity <= 0) {
      session.cart.splice(index, 1);
    }
  }
}

function clearCart(session) {
  session.cart = [];
}

module.exports = {
  getCartItems,
  calculateTotal,
  addProduct,
  increaseProduct,
  decreaseProduct,
  clearCart,
};