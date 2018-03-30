pragma solidity ^0.4.13;

import "./Owned.sol";


contract Stoppable is Owned {

    bool public running;

    event LogStopSwitch(address sender, bool runningState);

    modifier onlyIfRunning {
        require(running);
        _;
    }

    function Stoppable()
    public
    {
        running = true;
    }

    function runSwitch(bool onOff)
    internal
    //onlyOwner
    //taking this out so Admin can run this downstream
    returns(bool success) {
        running = onOff;
        LogStopSwitch(msg.sender, onOff);
        return true;

    }

}
