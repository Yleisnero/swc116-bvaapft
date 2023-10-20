advanceTimeAndBlock = async (time) => {
    await advanceTime(time);
    await advanceBlock();

    return Promise.resolve(web3.eth.getBlock());
}

advanceTime = (time) => {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: "2.0",
            method: "evm_increaseTime",
            params: [time],
            id: new Date().getTime()
        }, (err, result) => {
            if (err) { return reject(err); }
            return resolve(result);
        });
    });
}

advanceBlock = () => {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: "2.0",
            method: "evm_mine",
            id: new Date().getTime()
        }, (err, _result) => {
            if (err) { return reject(err); }
            return resolve(web3.eth.getBlockNumber())
        });
    });
}

async function getCurrentBlockTimestamp() {
    const currentBlockNumber = await web3.eth.getBlockNumber();
    const currentBlock = await web3.eth.getBlock(currentBlockNumber);
    return currentBlock.timestamp;
}

module.exports = {
    advanceBlock,
    advanceTime,
    advanceTimeAndBlock,
    getCurrentBlockTimestamp
}