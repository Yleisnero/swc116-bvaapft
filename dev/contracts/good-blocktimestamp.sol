contract Game {
    uint startingTime;

    constructor() public {
        startingTime = block.timestamp;
    }

    function play() public {
        // is in the future
        require(block.timestamp > startingTime);
        msg.sender.transfer(2 ether);
    }
}