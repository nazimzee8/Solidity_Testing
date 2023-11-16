// SPDX-License-Identifier: MIT
//pragma solidity 0.8.10;
pragma solidity 0.8.9;
pragma experimental ABIEncoderV2;
import "./RSU.sol";
import "./Provider.sol";

contract Vehicle {
    //address ownerAddr;
    //CarOwner owner;
    address public sender;
    address[] public receivers;
    Media media;
    mapping(address => Provider) public serviceProviders;
    address[] addressProviders;
    mapping(address => RSU) public connectedRSUs;
    uint256 longitude;
    uint256 latitude;
    uint VIN;
    uint vID;
    string vName;
    State status;
    uint speed;
    int txNum;
    int endorsed;
    int flagged;
    int validNum;

    // enum Message { CRITICAL, }
    enum State {PARKED, DRIVE, REVERSE, NEUTRAL}
    event Critical(address indexed from, address indexed to, uint amount, string message, uint nonce);
    event Signed(bytes32 messageHash);
    mapping (address => RSU) registeredRSUs;


    constructor(uint _VIN, uint _vID, string memory _vName) public {
        sender = msg.sender;
        VIN = _VIN;
        vID = _vID;
        vName = _vName;
        status = State.PARKED;
        txNum = 0;
        endorsed = 0;
        flagged = 0;
        validNum = 0;
    }
    
    function getReceivers() public view returns (address[] memory) {
        return receivers;
    }
    
    function setConnectedRSU(address _address, RSU rsu) public {
        connectedRSUs[_address] = rsu;
    }
    
    function retrieveLocation(uint256 _longitude, uint256 _latitude) public {
        longitude = _longitude;
        latitude = _latitude;
    }

    function getMessageHash(address _receiver, uint _amount, string memory _message, uint _nonce) public payable returns (bytes32) {
        emit Critical(msg.sender, _receiver, _amount, _message, _nonce);
        return keccak256(abi.encodePacked(_receiver, _amount, _message, _nonce));
    }

    function getEthSignedMessageHash(bytes32 _messageHash) public payable returns (bytes32) {
        emit Signed(_messageHash);
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }

    function getSignatureEvaluation(address[] memory _receivers, uint _amount, string memory _message, uint _nonce, bytes memory signature) public payable returns (address[] memory) {
        uint i = 0;
        uint len = _receivers.length;
        bool result;
        address[] memory validRSUs;
        for (i = 0; i < len; i++) {
            RSU rsu = connectedRSUs[_receivers[i]];
            result = rsu.verifySignature(msg.sender, _receivers[i], _amount, _message, _nonce, signature);
            if (result) validRSUs[validRSUs.length-1] = address(rsu);
        }
        return validRSUs;
    }

    function retrieveProviders(Provider[] memory _providers) public {
        uint i = 0;
        uint len = _providers.length;
        for (i = 0; i < len; i++) {
            Provider provider = _providers[i];
            serviceProviders[address(provider)] = provider;
            addressProviders[i] = address(provider);
        }
    }

    function selectProvider() public view {
        // Use Topsis to select provider and media. 
    }

}