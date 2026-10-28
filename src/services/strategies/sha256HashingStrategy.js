const crypto = require('crypto');

// Estrategia Concreta: Cálculo de Hash usando algoritmo SHA-256
class SHA256HashingStrategy {
  constructor() {
    this.algoritmo = 'sha256';
  }

  generarHash(buffer) {
    if (!buffer) {
      throw new Error('El buffer del archivo es requerido para calcular el hash.');
    }
    return crypto.createHash(this.algoritmo).update(buffer).digest('hex');
  }
}

module.exports = SHA256HashingStrategy;