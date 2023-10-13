var TimeLock = artifacts.require("TimeLock");
var TimedCrowdsale = artifacts.require("TimedCrowdsale");

module.exports = function(deployer) {
  deployer.deploy(TimeLock);
  deployer.deploy(TimedCrowdsale);
};