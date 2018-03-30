pragma solidity ^0.4.13;


contract Owned {
    address public owner;

    event LogNewOwner(address sender, address oldOwner, address newOwner);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    //constructor, run to set owner
    function Owned()
    public {
        owner = msg.sender;
    }

    function changeOwner(address newOwner)
    public
    returns(bool success)
    {
        LogNewOwner(msg.sender, owner, newOwner);
        owner = newOwner;
        return true;
    }

}
