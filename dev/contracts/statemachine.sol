// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract StateMachine {
    uint public stage;
    uint public creationTime;

    function changeState() public {
        if (stage == 1 && block.timestamp >= creationTime + 6 days) {
            nextStage();
        }
        if (stage == 2 && block.timestamp >= creationTime + 10 days) {
            nextStage();
        }
    }
}
