const SHA256 = require('crypto-js/sha256')
const CryptoJS = require('crypto-js')
class Block {
    constructor(index, header, timestamp, prevHash=" ", merkleRoot) {
        this.index = index;
        this.nonce = 0
        this.header = header;
        this.timestamp = timestamp;
        this.hash = computeHash();
        this.prevHash = prevHash;
        this.merkleRoot = merkleRoot;
   }

    computeHash = function() {
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.header).toString() + this.nonce)
    }

    convertHash = function() {
        return this.hash.toString(CryptoJS.enc.Hex)
    }
}