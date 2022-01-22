// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// openzeppelin ERC721 

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    // Counter.Counter keeps track of tokenIds
    Counters.Counter private _tokenIds;

    // address of marketplace for NFTs tointeract
    address contractAddress;

    // NFT contract transats with toekns or change ownership
    // setApproval for all allows us to interact w/contract adddress

    // constructor set up address
    constructor(address marketplaceAddress) ERC721('Metasalt', 'MST') {
        contractAddress = marketplaceAddress;
    }

    function mintToken(string memory tokenURI) public returns(uint){
        
        // increment function is from OpenZeppeln util Counter .sol 
        _tokenIds.increment();

        // store newTokens in newItemId
        // inccurrent function is from OpenZeppeln util Counter .sol 
        uint256 newItemId = _tokenIds.current();        
        
        // passing in ID and URL
        _mint(msg.sender, newItemId);
        
        
        // takes in id and url
        // setTokenURI fx comes from Openzeppelin
        _setTokenURI(newItemId, tokenURI);

        // approval rights to the marketplace between the different users
        setApprovalForAll(contractAddress, true);

        // mint the token and set token for sale and return id to do so
        return newItemId;
    }



}

