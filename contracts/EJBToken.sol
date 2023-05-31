//SPDX-License-Identifier:MIT
pragma solidity ^0.8.6;
import "./Openzeppelin/ERC20.sol";


contract EarnedToken is ERC20{
    constructor() ERC20("Earned","EJB"){
        _mint(msg.sender,1000000*10**18);
    }
   
}