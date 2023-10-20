const timeTravelHelper = require("../helpers/time_travel_helper");

contract("TimeTravelHelper test", async accounts => {
    it("Should advance the blockchain forward a block", async () => {
        const originalBlockNumber = await web3.eth.getBlockNumber();
        const originalBlock = await web3.eth.getBlock(originalBlockNumber);

        const newBlockNumber = await timeTravelHelper.advanceBlock();

        newBlock = await web3.eth.getBlock(newBlockNumber);

        const shouldBeBlockNumber = originalBlock.number + 1;
        assert(shouldBeBlockNumber === newBlock.number);
    });

    it("Should be able to advance time and block together", async () => {
        const advancement = 600;
        const originalBlockNumber = await web3.eth.getBlockNumber();
        const originalBlock = await web3.eth.getBlock(originalBlockNumber);

        await timeTravelHelper.advanceTimeAndBlock(advancement);

        const newBlockNumber = await web3.eth.getBlockNumber();
        const newBlock = await web3.eth.getBlock(newBlockNumber);

        console.log("originalBlockNumber", originalBlockNumber);
        console.log("newBlockNumber", newBlockNumber);

        assert.isTrue(originalBlockNumber < newBlockNumber);

        console.log("Original block time: " + originalBlock.timestamp);
        console.log("New block time: " + newBlock.timestamp);
        const shouldBeBlockTimestamp = originalBlock.timestamp +  advancement;
        assert(shouldBeBlockTimestamp === newBlock.timestamp);
    });
});
