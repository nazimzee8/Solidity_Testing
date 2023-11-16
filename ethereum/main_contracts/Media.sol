// SPDX-License-Identifier: MIT
//pragma solidity 0.8.10;
pragma solidity 0.8.9;
pragma experimental ABIEncoderV2;

contract Media {
    string title;
    string publisher;
    uint length;
    string[] writers;
    string genre;
    uint256 date;
    string album;
    string rating;
    
    constructor() public {}

    function retrieveData(string memory _title, string memory _publisher, uint _length, string[] memory _writers, string memory _genre, uint256 _date, string memory _album, string memory _rating) public {
        title = _title;
        publisher = _publisher;
        length = _length;
        writers = _writers;
        genre = _genre;
        date = _date;
        album = _album;
        rating = _rating;
    }
}