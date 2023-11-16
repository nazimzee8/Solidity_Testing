//Generating Keys using ECDSA
/*function generateKeys(abi, addr) {
    const curve = "secp256r1"; 
    const ec = new KJUR.crypto.ECDSA({"curve": curve});

    //Generating Keypair
    const keypair = ec.generateKeyPairHex();

    //Generating Private Key
    const private_key = keypair.ecprvhex;

    //Generating Public Key
    const public_key = keypair.ecpubhex;

    //Signature Algorithm SHA256withECDSA, SHA1withECDSA  
    const signature_algo = "SHA256withECDSA";

    //Generating the signature
    const signature = new KJUR.crypto.Signature({"alg": signature_algo});
    signature.init({d: private_key, curve: curve});

    const contract = new web3.eth.Contract(abi, addr);
    const registered_unit = await contract.methods.generateKeys()
}*/