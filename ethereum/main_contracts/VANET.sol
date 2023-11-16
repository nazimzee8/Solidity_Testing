// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
pragma experimental ABIEncoderV2;
import "./Vehicle.sol";
import "./RSU.sol";

contract VANET {
    mapping (address => Vehicle) registeredVehicles;
    mapping (address => RSU) registeredRSUs;


    constructor() public {}

    function retrieveVehicle(address addr) public {
        registeredVehicles[addr] = Vehicle(addr);
    }

    function retrieveRSU(address addr) public {
        registeredRSUs[addr] = RSU(addr);
    }
}
