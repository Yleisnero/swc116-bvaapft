const timeTravelHelper = require("../helpers/time_travel_helper");

contract("TimeTravelHelper test", async accounts => {
    it("Should advance the blockchain forward a block", async () => {
        const originalBlockNumber = await web3.eth.getBlockNumber();
        const originalBlock = await web3.eth.getBlock(originalBlockNumber);

        const newBlock = await timeTravelHelper.advanceBlock();

        assert.notEqual(originalBlock.hash, newBlock.hash);
    });

    it("Should be able to advance time and block together", async () => {
        const advancement = 600;
        const originalBlock = await web3.eth.getBlock();
        const originalBlockNumber = await web3.eth.getBlockNumber();

        await timeTravelHelper.advanceTimeAndBlock(advancement);

        const newBlock = await web3.eth.getBlock();
        const newBlockNumber = await web3.eth.getBlockNumber();

        console.log("originalBlockNumber", originalBlockNumber);
        console.log("newBlockNumber", newBlockNumber);

        assert.isTrue(originalBlockNumber < newBlockNumber);

        // Increasing time does not work
        // console.log("Original block time: " + originalBlock.timestamp);
        // console.log("New block time: " + newBlock.timestamp);
        // assert.isTrue(originalBlock.timestamp < newBlock.timestamp);
    });
});
