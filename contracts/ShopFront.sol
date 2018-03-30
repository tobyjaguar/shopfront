//Shop that Admin can add product
//product is: id, price, stock
//user can buy
//owner can pay or withdraw
pragma solidity ^0.4.13;

import "./Stoppable.sol";


contract ShopFront is Stoppable {

    address public admin;
    uint256 public idRef;
    uint256 public shopBalance;
    uint256 public changeExpiry;

    struct Product {
        bytes32 name;
        uint256 price;
        uint256 stock;
    }

    struct User {
        uint256 idRef;
        uint256 change;
        uint256 purchaseBlock;
        bool    isBanned;
    }

    mapping(uint256 => Product) public productList;
    mapping(address => User) public users;

    event LogAddProduct(address eSender, uint256 eIDRef, bytes32 eName, uint256 ePrice, uint256 eStock);
    event LogUpdateProduct(address eSender, uint256 eIDRef, bytes32 eName, uint256 ePrice, uint256 eStock);
    event LogProductPurchased(address buyer, uint256 eIDRef, bytes32 eName, uint256 ePrice, uint256 eStock);
    event LogChangeSent(address eBuyer, uint256 eIDRef, uint256 amount);
    event LogFundsSentToShop(address eSender, uint256 eAmount);
    event LogWithdrawFromShop(address eSender, uint256 eAmount);
    event LogReconciledBalance(address customer, uint256 eAmount);
    event LogBanUser(address eSender, address eBanAddress);
    event LogShopFrozen(address eSender);
    event LogShopUnfrozen(address eSender);
    event LogShopGotNewOwner(address eSender, address eNewOwner);

    modifier onlyAdmin {
        require(msg.sender == admin);
        _;
    }

    modifier onlyIfNotBanned {
        require(!users[msg.sender].isBanned);
        _;
    }

    function setupShop(address _admin, uint256 _expiry)
    public
    onlyOwner
    onlyIfRunning
    returns(bool success)
    {
        require(_admin != 0);
        admin = _admin;
        changeExpiry = _expiry;
        return true;
    }

    function getBalance()
    public
    constant
    returns(bool success, uint256 _balance)
    {
        return(true, shopBalance);
    }

    function addProduct(bytes32 _name, uint256 _price, uint256 _stock)
    public
    onlyAdmin
    onlyIfRunning
    returns(bool success)
    {
        require(_name != 0 && _price != 0 && _stock != 0);
        idRef++;
        productList[idRef].name = _name;
        productList[idRef].price = _price;
        productList[idRef].stock = _stock;

        LogAddProduct(msg.sender, idRef, productList[idRef].name,
            productList[idRef].price,
            productList[idRef].stock);
        return true;
    }

    function updateProduct(uint256 _refId, bytes32 _name, uint256 _price, uint256 _stock)
    public
    onlyAdmin
    onlyIfRunning
    returns(bool success)
    {
        require(_refId != 0 && _name != 0 && _price != 0 && _stock != 0);
        require(productList[_refId].price != 0);
        //how to check that productList[idCount] exists???
        productList[_refId].name = _name;
        productList[_refId].price = _price;
        productList[_refId].stock += _stock;

        LogUpdateProduct(msg.sender, _refId, productList[_refId].name,
            productList[_refId].price,
            productList[_refId].stock);
        return true;
    }

    function buyProduct(uint256 _refId, uint8 _numToBuy)
    public
    payable
    onlyIfRunning
    returns(bool success)
    {
        require(msg.sender != 0);
        require(msg.value >= productList[_refId].price);
        require(_numToBuy <= productList[_refId].stock);
        //careful!!!
        users[msg.sender].change = msg.value - productList[_refId].price;
        users[msg.sender].idRef = _refId;
        users[msg.sender].purchaseBlock = block.number;

        productList[_refId].stock -= _numToBuy;
        //changed from msg.value - users[msg.sender].change.amount
        shopBalance += productList[_refId].price;


        //what is the shop sending to the customer???
        //msg.sender.transfer(???);
        LogProductPurchased(msg.sender,
            _refId, productList[_refId].name,
            productList[_refId].price,
            productList[_refId].stock);
        return true;
    }

    function returnChange()
    public
    onlyIfRunning
    onlyIfNotBanned
    returns(bool success)
    {
        require(msg.sender != 0);
        require(users[msg.sender].change != 0);
        require(block.number < users[msg.sender].purchaseBlock + changeExpiry);

        uint256 refund;
        refund = users[msg.sender].change;
        users[msg.sender].change = 0;
        msg.sender.transfer(refund);

        LogChangeSent(msg.sender, users[msg.sender].idRef, refund);
        return true;

    }

    function banUser(address banAddress)
    public
    onlyAdmin
    onlyIfRunning
    returns(bool success)
    {
        users[banAddress].isBanned = true;

        LogBanUser(msg.sender, banAddress);
        return true;
    }

    function depositFunds()
    public
    payable
    onlyOwner
    onlyIfRunning
    returns(bool success)
    {
        shopBalance += msg.value;
        return true;
    }

    function withdrawFunds(uint256 _amount)
    public
    onlyOwner
    onlyIfRunning
    returns(bool success)
    {
        require(_amount < shopBalance);
        shopBalance -= _amount;
        msg.sender.transfer(_amount);

        LogWithdrawFromShop(msg.sender, _amount);
        return true;
    }

    function reconcileBalance(address _customer)
    public
    onlyAdmin
    onlyIfRunning
    returns(bool success)
    {
        require(users[msg.sender].purchaseBlock + changeExpiry <= block.number);

        shopBalance += users[msg.sender].change;
        LogReconciledBalance(_customer, users[msg.sender].change);
        users[msg.sender].change = 0;

        return true;
    }

    // Pass-through Admin Controls
    function freezeShop()
    internal
    onlyAdmin
    returns(bool success)
    {

        LogShopFrozen(msg.sender);
        return(runSwitch(false));
    }

    function startShop()
    internal
    onlyAdmin
    returns(bool success)
    {
        LogShopUnfrozen(msg.sender);
        return(runSwitch(true));
    }

    function changeShopOwner(address newOwner)
    internal
    onlyOwner
    returns(bool success)
    {
        LogShopGotNewOwner(msg.sender, newOwner);
        return(changeOwner(newOwner));
    }

}
