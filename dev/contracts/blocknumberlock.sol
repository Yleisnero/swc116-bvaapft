// Locking contract for a certain number of blocks
contract BlockNumberLock {
    uint startingBlock;

    constructor() public {
        // Allowed to play after 10 blocks
        startingBlock = block.number + 10;
    }

    function run() public {
        require(block.number >= startingBlock);
    }
}