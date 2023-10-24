contract Firework {
    function startFirework() public {
        // 01.01.2024 00:00:00 GMT+0100 => New years firework
        require(block.timestamp > 1704063600);
    }
}