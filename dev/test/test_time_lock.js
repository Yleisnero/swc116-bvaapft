const TimeLock = artifacts.require("TimeLock");

contract("TimeLock test", async accounts => {
    let timeLock;

    let owner = accounts[0];

    beforeEach("deploy and init", async () => {
        timeLock = await TimeLock.new({ from: owner });
    });

    it("test", async () => {
        timeLock.lockEth(10, 100, { value: 100, from: owner })
        
        delay(10).then(() => {
            timeLock.withdraw({ from: owner });
        });
    });
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}