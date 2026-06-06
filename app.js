const express = require('express');
const session = require('express-session');
const ejsLayouts = require('express-ejs-layouts');

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const pageRoutes = require('./routes/pageRoutes');

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

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

app.use((req, res, next) => {
  const cart = req.session.cart || [];
  res.locals.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  next();
});

app.use(pageRoutes);
app.use(productRoutes);
app.use(cartRoutes);

app.use((req, res) => {
  res.status(404).render('pages/error404', { title: 'Pagina no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error500', { title: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Aplicacion funcionando en el puerto ${port}`);
});
