contract Game {
    uint startingBlock;

    constructor(uint timeOffset) public {
        startingBlock = block.number + (timeOffset / 14);
    }

    function play() public {
        require(block.number >= startingBlock);
    }
}
