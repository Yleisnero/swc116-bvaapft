/*
  Source: https://dasp.co/#item-8
  PoW: block.timestamp can be tampered with
  PoS: no issue anymore
 */
pragma solidity ^0.8.21;

contract Game {
  bool neverPlayed = true;

  function play() public {
    require(block.timestamp > 1521763200 && neverPlayed == true);
    neverPlayed = false;
    payable(msg.sender).transfer(1500 ether);
  }
}
