const Migrations = artifacts.require("./contracts/Migrations.sol");

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(Migrations);
}