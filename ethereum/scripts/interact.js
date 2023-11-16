contracts = require('./deploy.js');
const RSU = contracts.rsu;
const Vehicle = contracts.vehicle;
const web3 = contracts.web3;

const registeredRSUs = new Map();
const RSUContracts = new Map();

const registeredVehicles = new Map();
const vehicleContracts = new Map();
const transactions = new Map();
var top_speed = 0;
var distance = 0;
var end_time = 0;
var charge = 0;
var best_provider;


function registerRSU() {
    const rsu = web3.eth.accounts.create(web3.utils.randomHex(32));
    const contract = new web3.eth.Contract(RSU.abi, rsu['address']);
    registeredRSUs.set(rsu['address'], rsu);
    RSUContracts.set(rsu['address'], contract);
}

function registerVehicle() {
    const vehicle = web3.eth.accounts.create(web3.utils.randomHex(32));
    const contract = new web3.eth.Contract(Vehicle.abi, vehicle['address']);
    registeredVehicles.set(vehicle['address'], vehicle);
    vehicleContracts.set(vehicle['address'], contract);  
}

function connectVehicle(rsu, vehicle, amount, message) {
    const v_contract = registeredVehicles.get(vehicle['address']);
    const rsu_contract = registeredRSUs.get(rsu['address']);
    const nonce = web3.eth.getTransactionCount(rsu['address']);
    const signature = async function() {
        let prefix = "\x19Ethereum Signed Message:\n32" + message.length;
        let messageHash = web3.utils.sha3(prefix+message);

        let signature = await vehicle.sign(messageHash, vehicle['privateKey']);
        return signature;
    }
    rsu_contract.methods.registerVehicle(v_contract, vehicle['address'], amount, message, nonce, signature);
}

function addTransaction(vehicle) {
    const address = vehicle['address'];
    vehicle = registeredVehicles.get(address);
    const latest = await web3.eth.getBlockNumber();
    const date = latest.timeStamp;
    transactions.set(date, {top_speed, distance, end_time, charge, best_provider, latest});
}

function retrieveTransactions(vehicle, date) {
    const timeStamp = 
    const {currentBlock, highestBlock} = web3.eth.syncing;
 
}

