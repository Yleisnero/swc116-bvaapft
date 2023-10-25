// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract Game {
  uint startingBlock;
  bool played = false;
  uint constant SECONDS_PER_SLOT = 12;

  constructor(uint timeOffset) {
    startingBlock = block.number + (timeOffset / SECONDS_PER_SLOT);
  }

  function play() public {
    require(block.number >= startingBlock);
    played = true;
  }
}
