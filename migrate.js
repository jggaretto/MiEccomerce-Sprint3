const path = require('path');
const db = require('./db/database');
const products = require('./products.json');

const insert = db.prepare(`
  INSERT OR IGNORE INTO products (id, name, price, category, description, image, featured)
  VALUES (@id, @name, @price, @category, @description, @image, @featured)
`);

const migrate = db.transaction(() => {
  for (const product of products) {
    insert.run({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category || null,
      description: product.description || null,
      image: product.image || null,
      featured: product.featured ? 1 : 0,
    });
  }
});

migrate();

console.log(`✅ Migración completada: ${products.length} productos insertados en SQLite.`);