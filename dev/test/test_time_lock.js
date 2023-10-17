const timeTravelHelper = require("../helpers/time_travel_helper");
const TimeLock = artifacts.require("TimeLock");

contract("TimeLock test", async accounts => {
    let timeLock;

    beforeEach("deploy and init", async () => {
        timeLock = await TimeLock.new();
    });

    it("Test TimeLock should succeed", async () => {
        var balanceBefore = await web3.eth.getBalance(timeLock.address);
        console.log("balanceBefore: " + balanceBefore);
        const lockTime = 140;
        await timeLock.lockEth(lockTime, 123456789, { value: 123456789 })
        console.log("Current block number: " + await web3.eth.getBlockNumber());

        var balanceAfterLock = await web3.eth.getBalance(timeLock.address);
        console.log("balanceAfterLock: " + balanceAfterLock);

        // Simulate delay
        for (var i = 0; i < lockTime / 14; i++) {
            await timeTravelHelper.advanceBlock()
        }

        console.log("Current block number: " + await web3.eth.getBlockNumber());

        await timeLock.withdraw();
        var balanceAfter = await web3.eth.getBalance(timeLock.address);
        console.log("balanceAfter: " + balanceAfter);
        assert(balanceBefore === balanceAfter);
    });

    it("Test TimeLock should fail", async () => {
        try {
            await timeLock.lockEth(14000, 123456789, { value: 123456789 });
            await timeLock.withdraw();

            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            assert.include(err.message, "revert", "The error message should contain 'revert'");
        }
    });
});

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