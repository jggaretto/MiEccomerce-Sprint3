const express = require('express');
const session = require('express-session');
const ejsLayouts = require('express-ejs-layouts');

const { getIndex, getProductDetail, getCategory } = require('./controllers/productControllers');
const { getCart, addToCart, increaseQuantity, decreaseQuantity, clearCart } = require('./controllers/cartController');

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(ejsLayouts);

app.use(session({
  secret: 'miecommerce-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

// Pasar cantidad de items del carrito a todas las vistas
app.use((req, res, next) => {
  const cart = req.session.cart || [];
  res.locals.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  next();
});

// ─── Rutas ────────────────────────────────────────────────────────────────────
app.get('/categories/:category', getCategory);

app.get('/', (req, res) => {
  res.render('pages/login', { title: 'Iniciar Sesión', layout: false });
});

app.get('/index', getIndex);

app.get('/products/:id', getProductDetail);

app.get('/products', (req, res) => {
  res.redirect('/products/1');
});

// ─── Rutas del carrito ────────────────────────────────────────────────────────
app.get('/cart', getCart);
app.post('/cart/add', addToCart);
app.post('/cart/increase', increaseQuantity);
app.post('/cart/decrease', decreaseQuantity);
app.post('/cart/clear', clearCart);

// ─── Otras páginas ────────────────────────────────────────────────────────────
app.get('/checkout', (req, res) => {
  res.render('pages/checkout', { title: 'Checkout' });
});

app.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Iniciar Sesión', layout: false }); 
});

app.get('/register', (req, res) => {
  res.render('pages/register', { title: 'Registrarse', layout: false });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Datos de login recibidos en el servidor:', username, password);
  res.redirect('/index');
});

app.post('/register', (req, res) => {
  const { email, password, confirmPassword } = req.body;
  console.log('Nuevo usuario registrado con email:', email);
  res.redirect('/login');
});

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('pages/error404', { title: 'Página no encontrada' });
});

app.listen(port, () => {
  console.log(`Aplicación funcionando en el puerto ${port}`);
});