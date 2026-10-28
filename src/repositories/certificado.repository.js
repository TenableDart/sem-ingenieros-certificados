const pool = require('../config/database');

class CertificadoRepository {
    static async initTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS certificados (
                id SERIAL PRIMARY KEY,
                codigo_certificado VARCHAR(100) NOT NULL,
                hash_sha256 VARCHAR(64) NOT NULL UNIQUE,
                fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                estado VARCHAR(50) DEFAULT 'ACTIVO'
            );
        `;
        await pool.query(query);
    }

    async guardar(data) {
        const { codigo_certificado, hash_sha256, estado } = data;
        const query = `
            INSERT INTO certificados (codigo_certificado, hash_sha256, estado)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [codigo_certificado, hash_sha256, estado];
        const resultado = await pool.query(query, values);
        return resultado.rows[0];
    }

    async buscarPorHash(hash_sha256) {
        const query = `SELECT * FROM certificados WHERE hash_sha256 = $1;`;
        const resultado = await pool.query(query, [hash_sha256]);
        return resultado.rows[0];
    }
}

module.exports = CertificadoRepository;