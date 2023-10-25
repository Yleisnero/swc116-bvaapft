/*
Source: https://swcregistry.io/docs/SWC-116/
Attacker can make the contract emit `Finished` 15 seconds earlier.
- mitigated in PoS
*/

pragma solidity ^0.5.0;

contract TimedCrowdsale {

  event Finished();
  event notFinished();

  // Sale should finish exactly at January 1, 2019
  function isSaleFinished() private returns (bool) {
    return block.timestamp >= 1546300800;
  }

  function run() public {
    if (isSaleFinished()) {
        emit Finished();
    } else {
        emit notFinished();
    }
  }

}
