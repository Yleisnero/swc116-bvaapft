// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract Firework {
  bool fireworkStarted = false;

  function startFirework() public {
    // 01.01.2024 00:00:00 GMT+0100
    require(block.timestamp > 1704063600);
    fireworkStarted = true;
  }
}
