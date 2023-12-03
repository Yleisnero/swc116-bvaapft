// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address payable[] public players;
    uint public lotteryEndTime;
    bool public lotteryEnded;

    constructor(uint duration) {
        lotteryEndTime = block.timestamp + duration;
        lotteryEnded = false;
    }

    function enterLottery() public payable {
        require(msg.value == 0.1 ether, "Must send exactly 0.1 ETH");
        if (block.timestamp < lotteryEndTime) {
          lotteryEnded = true;
        }
        require(!lotteryEnded, "Lottery has ended");

        players.push(payable(msg.sender));
    }

}

