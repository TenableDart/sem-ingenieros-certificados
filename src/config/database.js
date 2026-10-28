const { Pool } = require('pg');
require('dotenv').config();

// Pool de conexiones TCP/IP para PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'sem_ingenieros_db',
});

pool.on('connect', () => {
  console.log(' Conectado exitosamente a la base de datos PostgreSQL.');
});

pool.on('error', (err) => {
  console.error(' Error en la piscina de conexiones de PostgreSQL:', err);
});

module.exports = pool;