// SPDX-License-Identifier: MIT
//pragma solidity 0.8.10;
pragma solidity 0.8.9;
pragma experimental ABIEncoderV2;
import "./Vehicle.sol";

contract RSU {
    address sender;
    uint ID;
    uint longitude;
    uint latitude;
    uint distance;
    int txNum;
    int endorsed;
    int flagged;
    int validNum;
   
    mapping (address => Vehicle) registeredVehicles;
    event Connect(address indexed from, address indexed to, uint amount, string message, uint nonce);
    event Verify(address indexed from, address indexed to, uint amount, string message, uint nonce, bytes signature);

    constructor(uint _ID) public {
        sender = msg.sender;
        ID = _ID;
        txNum = 0;
        endorsed = 0;
        flagged = 0;
        validNum = 0;
    }

    modifier withinDistance(uint _distance) {
        require(distance <= _distance);
        _;
    }

    function retrieveLocation(uint _longitude, uint _latitude) public {
        longitude = _longitude;
        latitude = _latitude;
    }

    function registerVehicle(Vehicle vehicle, address _to, uint _amount, string memory _message, uint _nonce, bytes memory signature, uint _distance) public withinDistance(_distance) returns (bool) {
        bool result; 
        result = this.verifySignature(address(vehicle), _to, _amount, _message, _nonce, signature);
        if (result) {
            emit Connect(msg.sender, _to, _amount, _message, _nonce);
            address[] memory receivers = vehicle.getReceivers();
            receivers[receivers.length] = msg.sender;
            vehicle.setConnectedRSU(msg.sender, this);
            registeredVehicles[_to] = vehicle;
            return true;
        }
        return false;
    }

    // Signature is derived from web3 account 

    function verifySignature(address _signer, address _to, uint _amount, string memory _message, uint _nonce, bytes memory signature) public payable returns (bool) {
        emit Verify(_signer, _to, _amount, _message, _nonce, signature);
        bytes32 messageHash = registeredVehicles[_to].getMessageHash(_to, _amount, _message, _nonce);
        bytes32 ethSignedMessageHash = registeredVehicles[_to].getEthSignedMessageHash(messageHash);

        return recoverSigner(ethSignedMessageHash, signature) == _signer;
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }   

    function splitSignature(bytes memory sig) public pure returns (bytes32 r, bytes32 s,uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

        // implicitly return (r, s, v)
    }

    function evaluateTrust() public pure returns (uint) {

    }
    //return (r, s, v)
} 