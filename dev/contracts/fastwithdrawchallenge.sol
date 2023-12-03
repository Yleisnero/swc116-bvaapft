pragma solidity ^0.8.21;

contract FastWithdrawChallenge {
  bool neverPlayed = true;

  function play() public {
    require(block.timestamp > 1704063600 && neverPlayed == true);
    neverPlayed = false;
    payable(msg.sender).transfer(150 ether);
  }
}
