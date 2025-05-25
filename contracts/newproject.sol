// Template for new smart contracts associated with new projects/
// Template is generated automatically with information received from the user,
// and subsequently sent to admin/audit team to finalize before deployment.


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
 

contract NewProjectContract is ReentrancyGuard {
    // State variables 
    address public owner;   
    string public projectName;   
    string public developerName;       
    bool public projectStatus;

    constructor (){
        owner = msg.sender;
        projectName = "_NAMEPLACEHOLDER_";
        developerName = "_DEVNAME_";
    }
    

    // Function to close the contract at the end 
    function closeContract () public  nonpayable returns () {
        require(msg.sender == owner, "Only the owner can close the contract");
    }

}