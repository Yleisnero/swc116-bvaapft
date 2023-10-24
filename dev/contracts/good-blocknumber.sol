contract Game {
    uint startingBlock;

    constructor() public {
        // Allowed to play afer 10 blocks
        startingBlock = block.number + 10;
    }

    function play() public {
        require(block.number >= startingBlock);
    }
}