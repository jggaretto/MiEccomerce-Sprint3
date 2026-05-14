const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'store.db'); 
const schemaPath = path.join(__dirname, 'schema.sql');

const db = new Database(dbPath); 

// Ejecutar el schema al iniciar (crea las tablas si no existen)
const schema = fs.readFileSync(schemaPath, 'utf-8');
db.exec(schema);

module.exports = db;