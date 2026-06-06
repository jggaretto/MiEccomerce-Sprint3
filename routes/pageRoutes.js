const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/login', { title: 'Iniciar Sesion', layout: false });
});

router.get('/checkout', (req, res) => {
  res.render('pages/checkout', { title: 'Checkout' });
});

router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Iniciar Sesion', layout: false });
});

router.get('/register', (req, res) => {
  res.render('pages/register', { title: 'Registrarse', layout: false });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Datos de login recibidos en el servidor:', username, password);
  res.redirect('/index');
});

router.post('/register', (req, res) => {
  const { email } = req.body;
  console.log('Nuevo usuario registrado con email:', email);
  res.redirect('/login');
});

module.exports = router;
