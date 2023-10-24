contract Game {
    uint expiryTimestamp;

    constructor(uint expiry) public {
        expiryTimestamp = expiry;
    }

    function play() public {
        // Safe to use because block timestamp can not be modified backwards
        require(block.timestamp < expiryTimestamp);
    }
}