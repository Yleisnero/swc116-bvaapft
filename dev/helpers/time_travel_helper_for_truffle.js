const Web3 = require("web3");
// Truffle development provider
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
// Ganache provider
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545/'));

// const { time } = require('@openzeppelin/test-helpers');

advanceTimeAndBlock = async (time) => {
    await advanceTime(time);
    await advanceBlock();

    return Promise.resolve(web3.eth.getBlock());
}

advanceTime = (duration) => {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: '2.0',
            method: 'evm_increaseTime',
            params: [duration],
            id: new Date().getTime(),
        }, (err, result) => {
            if (err) { return reject(err); }
            return resolve(result);
        });
    });
}

// increaseTime = async (duration) => {
//     await time.increase(duration);
// }

advanceBlock = () => {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: "2.0",
            method: "evm_mine",
            id: new Date().getTime()
        }, (err, _result) => {
            if (err) { return reject(err); }
            return resolve(web3.eth.getBlock())
        });
    });
}

module.exports = {
    advanceBlock,
    advanceTime,
    advanceTimeAndBlock
    // increaseTime
}