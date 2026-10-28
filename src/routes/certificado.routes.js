const express = require('express');
const router = express.Router();
const multer = require('multer');
const certificadoController = require('../controllers/certificado.controller');

// Configuración de Multer para recibir archivos PDF en memoria
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint público: POST /api/v1/certificados/verificar
router.post('/verificar', upload.single('documentoPDF'), (req, res) => {
  certificadoController.verificarCertificado(req, res);
});

// Endpoint privado: POST /api/v1/certificados/emitir
router.post('/emitir', upload.single('documentoPDF'), (req, res) => {
  certificadoController.emitirCertificado(req, res);
});

module.exports = router;