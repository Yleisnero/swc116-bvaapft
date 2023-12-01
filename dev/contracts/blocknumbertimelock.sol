// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract BlockNumberTimeLock {
  uint unlockBlock;
  bool locked = true;
  uint constant SECONDS_PER_SLOT = 14;

  function lockEth(uint _time, uint _amount) public {
      unlockBlock = block.number + (_time / SECONDS_PER_SLOT);
  }

  function unlocked() public {
      require(block.number >= unlockBlock);
      locked = false;
  }
}
