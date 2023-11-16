const crypto = require('crypto')
class Vehicle {
    constructor(ID, RSU) {
        this.ID = ID;       // Vehicle ID
        this.RSU = RSU;     // RSU ID 
        this.txNum = 0;     // Number of transactions sent
        this.endorsed = 0;  // Number of endorsed transactions.
        this.flagged = 0;   // Number of fake transactions sent.
        this.validNum = 0;  // Number of valid transactions sent.
        this.rMsg = null;   // Received msg from a participant.
        this.cert = null //createECDH('secp256k1').generateKeys()   // Digital certificate
    }

    generateMsg = function() {}

    sendMsg = function() {}

    getCertificate = function() {
        return this.cert;
    }
}

class RSU {
    constructor(ID) {
        this.ID = ID;       // RSU ID
        this.Vehicles = []; // Store list of registered vehicles
        this.endorsed = 0;  // Number of endorsed transactions.
        this.rMsg = null;   // Received msg from a participant.
        this.cert = null    // Digital certificate
    }
}