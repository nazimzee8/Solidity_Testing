const Web3 = require('web3');
const ganache = require('ganache-cli');
//const web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
//const web3Provider = new Web3(ganacheProvider);
const web3Provider = new Web3(ganache.provider());
const web3 = new Web3(web3Provider);
/*if( typeof Web3.currentProvider !== 'undefined'){
   web3 = new Web3( Web3.currentProvider);
}else{
   web3 = new Web3( new Web3.providers.HttpProvider("http://localhost:8545"));
}*/

async function deploy(contract) {
   this.accounts = await web3.eth.getAccounts();
   const contract_addr = this.accounts[2];
   const compiled = require(contract);
   const abi = compiled.abi;
   const bytecode = compiled.evm.bytecode.object;
   const new_contract = new web3.eth.Contract(abi);

   const gasEstimate = web3.eth.estimateGas({
      to: contract_addr,
      data: bytecode,
   }).then(console.log);

   const gas_Estimate = 4500000;
   const gasPrice = 30000000000;

   // Deploy the contract and send it gas to run.
   this.contract = await new_contract
       .deploy({data:'0x'+ bytecode, arguments: [contract_addr]})
       .send({from: this.accounts[0], gas: gas_Estimate, gasPrice: gasPrice});

   module.exports = function(deployer) {
         deployer.deploy(this);
   }
   return this;
}

//const vanet = deploy("../build/VANET.json").then(useContract);
const rsu = deploy("../build/RSU.json").then(useContract);
const vehicle = deploy("../build/Vehicle.json").then(useContract);
const media = deploy("../build/Media.json").then(useContract);
const provider = deploy("../build/Provider.json").then(useContract);

function useContract(result) {
   // Use result.accounts and result.contract here to do what you like.
   const abi = result.contract.options.abi;
   const address = result.contract.options.address;
   console.log('Contract deployed to: ' + address);
   console.log('Owner address is:     ' + result.accounts[0]);
   console.log('Manufacturer address: ' + result.accounts[1]);
   return {abi: abi, address: address};
}

