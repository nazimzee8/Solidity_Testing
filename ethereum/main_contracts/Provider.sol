// SPDX-License-Identifier: MIT
//pragma solidity 0.8.10;
pragma solidity 0.8.9;
pragma experimental ABIEncoderV2;
import "./Media.sol";

contract Provider {
    string name;
    uint256 cost;
    mapping(address => Media) registeredMedia;

    constructor(string memory _name, uint256 _cost) public {
        name = _name;
        cost = _cost;
    }

    function addMedia(Media media) public {
        registeredMedia[address(media)] = media;
    }

    function charge(uint256 _cost) public {
        cost = _cost;
    }
}