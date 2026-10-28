const CertificadoRepository = require('../../repositories/certificado.repository');
const SHA256HashingStrategy = require('../strategies/sha256HashingStrategy');

class FachadaValidacion {
    constructor() {
        this.certificadoRepository = new CertificadoRepository();
        this.hashingStrategy = new SHA256HashingStrategy();
    }

    async registrarCertificado(codigo_certificado, contenido) {
        // 1. Generar el hash SHA-256 usando la estrategia
        const hash_sha256 = this.hashingStrategy.generarHash(contenido);

        // 2. Guardar en la base de datos de PostgreSQL a través del repositorio
        const resultado = await this.certificadoRepository.guardar({
            codigo_certificado,
            hash_sha256,
            estado: 'ACTIVO'
        });

        return resultado;
    }

    async verificarCertificado(contenido) {
        // 1. Generar el hash del documento recibido
        const hash_sha256 = this.hashingStrategy.generarHash(contenido);

        // 2. Buscar si el hash existe en PostgreSQL
        const certificado = await this.certificadoRepository.buscarPorHash(hash_sha256);

        if (certificado) {
            return {
                valido: true,
                mensaje: "El certificado es auténtico y válido.",
                certificado
            };
        }

        return {
            valido: false,
            mensaje: "El certificado no existe en el sistema o ha sido alterado."
        };
    }
}

module.exports = FachadaValidacion;