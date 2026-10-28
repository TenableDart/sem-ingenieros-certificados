const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const CertificadoRepository = require('./src/repositories/certificado.repository');
const certificadoRoutes = require('./src/routes/certificado.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de la carpeta 'public' (aquí vive tu interfaz visual)
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar tabla en PostgreSQL
CertificadoRepository.initTable();

// Carga de Rutas del Sistema
app.use('/api/v1/certificados', certificadoRoutes);

// Endpoint de prueba de salud de la API (movido a /api/v1/health para liberar la raíz '/')
app.get('/api/v1/health', (req, res) => {
  res.json({
    proyecto: 'SEM Ingenieros - API Verificación de Certificados',
    baseDeDatos: 'PostgreSQL',
    estado: 'Servidor activo'
  });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});