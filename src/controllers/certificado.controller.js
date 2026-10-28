const FachadaValidacion = require('../services/facade/fachadaValidacion');
const fachada = new FachadaValidacion();

const emitirCertificado = async (req, res) => {
    try {
        const { codigo_certificado, texto_certificado } = req.body;

        if (!codigo_certificado) {
            return res.status(400).json({ error: "Se requiere el código del certificado." });
        }

        // Si viene un archivo PDF usa su buffer, si no, usa el texto de prueba
        const contenido = req.file ? req.file.buffer : (texto_certificado || "Contenido por defecto SEM Ingenieros");

        const resultado = await fachada.registrarCertificado(codigo_certificado, contenido);
        res.status(200).json({
            mensaje: "Certificado emitido y registrado exitosamente en PostgreSQL.",
            data: resultado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verificarCertificado = async (req, res) => {
    try {
        const contenido = req.file ? req.file.buffer : (req.body.texto_certificado || "Contenido por defecto SEM Ingenieros");

        const resultado = await fachada.verificarCertificado(contenido);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    emitirCertificado,
    verificarCertificado
};