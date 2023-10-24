contract Game {
    uint startingBlock;

    constructor(uint blockOffset) public {
        startingBlock = block.number + blockOffset;
    }

    function play() public {
        require(block.number >= startingBlock);
    }
}