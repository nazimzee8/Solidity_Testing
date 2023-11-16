const Vehicle = artifacts.require("contracts/Vehicle.sol");
const RSU = artifacts.require("contracts/RSU.sol");
const Media = artifacts.require("contracts/Media.sol");
const Provider = artifacts.require("contracts/Provider.sol");

module.exports = function (deployer, network, accounts) {
  deployer.then(async () => {
    await deployer.deploy(Vehicle);
    await deployer.deploy(RSU);
    await deployer.deploy(Media);
    await deployer.deploy(Provider);
  });
};
