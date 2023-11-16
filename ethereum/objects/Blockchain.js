const MerkleTree = require('merkle-tools')
class Blockchain {
    constructor() {
        this.blockchain = [];   // The blockchain
        this.merkleTree = new MerkleTree('SHA256')
    }

    getLatestBlock = function() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock = function(newBlock) {
        if (this.blockchain.length > 0) newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = this.computeHash();
        this.blockchain.push(newBlock);
        hex = newBlock.convertHash();
        this.merkleTree.addLeaf(hex);
        newBlock.merkleRoot = this.merkleHash();
    }

    merkleHash = function() {
        this.merkleTree(false);
        return this.merkleTree.getMerkleRoot();
    }

    checkIntegrity = function() {
        for(let i = 1; i < this.blockchain.length; i++){
            const currBlock = this.blockchain[i];
            const prevBlock= this.blockchain[i-1];

          if(currBlock.hash !== currBlock.computeHash()){
              return false;
          }
          if(currentBlock.prevHash !== prevBlock.hash)
            return false;
        }
        return true;
    }
}