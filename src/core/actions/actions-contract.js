import constants from 'core/types'
import contract  from 'truffle-contract'
import ShopFront from '../../../build/contracts/ShopFront.json'

function contractHelper(contract) {
  if (typeof contract.currentProvider.sendAsync !== "function") {
    contract.currentProvider.sendAsync = function() {
      return contract.currentProvider.send.apply(
        contract.currentProvider,
        arguments
      );
    };
  }
  return contract;
}

/**
 * Call the contract's functions
 */
function setupShop(ShopFrontContract, account, expiration, resolve) {
  ShopFrontContract.deployed()
  .then(instance => {
    return instance.setupShop(account, expiration, {from: account});
  })
  .then(txObj => {
    const txObjExists = txObj ? true : false
    resolve(txObj)
  })
  .catch(error => {
    throw(error)
  })
 }

function addProductToContract(ShopFrontContract, account, name, price, stock, resolve) {
  ShopFrontContract.deployed()
  .then(instance => {
    return instance.addProduct(name, price, stock, {from: account, gas: 3000000});
  })
  .then(txObj => {
    const txObjExists = txObj ? true : false
    resolve(txObj)
  })
  .catch(error => {
    throw(error)
  })
}

function updateProductToContract(ShopFrontContract, account, refID, name, price, stock, resolve) {
  ShopFrontContract.deployed()
  .then(instance => {
    return instance.updateProduct(refID, name, price, stock, {from: account, gas: 3000000});
  })
  .then(txObj => {
    const txObjExists = txObj ? true : false
    resolve(txObj)
  })
  .catch(error => {
    throw(error)
  })
}

function getNumberOfProductsFromContract(ShopFrontContract, account, resolve) {
  ShopFrontContract.deployed()
  .then(instance => {
    return instance.idRef.call({from: account});
  })
  .then(idTotal => {
    resolve(idTotal)
  })
  .catch(error => {
    throw(error)
  })
}

function getProductFromContract(ShopFrontContract, account, refID, resolve) {
  ShopFrontContract.deployed()
  .then(instance => {
    return instance.productList.call(refID, {from: account});
  })
  .then(IdArray => {
    resolve(IdArray)
  })
  .catch(error => {
    throw(error)
  })
}

function buyProductFromContract(ShopFrontContract, account, refID, price, qty, resolve) {
  ShopFrontContract.deployed()
  .then(instance => {
    return instance.buyProduct(refID, qty, {from: account, value: price, gas: 3000000});
  })
  .then(txObj => {
    resolve(txObj)
  })
  .catch(error => {
    throw(error)
  })
}

function banThisUser(ShopFrontContract, account, bannedAddress, resolve) {
  ShopFrontContract.deployed()
  .then(instance => {
    return instance.banUser(bannedAddress, {from: account});
  })
  .then(txObj => {
    const txObjExists = txObj ? true : false
    resolve(txObj)
  })
  .catch(error => {
    throw(error)
  })
}

function getAdmin(ShopFrontContract, account, resolve) {
  ShopFrontContract.deployed()
  .then(instance => {
    return instance.admin.call({from: account});
  })
  .then(adminAddress => {
    const addressSet = adminAddress ? true : false
    resolve(adminAddress)
  })
  .catch(error => {
    throw(error)
  })
}

function getAddressFromContract(ShopFrontContract, account, resolve) {
  ShopFrontContract.deployed()
  .then(instance => {
    return instance.contract.address;
  })
  .then(contractAddress => {
    const addressExists = contractAddress ? true : false
    resolve(contractAddress)
  })
  .catch(error => {
    throw(error)
  })
}

 /**
  * Dispatch
  */
 function dispatchShopCreated(txObj, expiration, dispatch) {
   dispatch((() => {
     return {
       type: constants.CREATE_SHOP,
       transaction: txObj.tx,
       expiration: expiration,
       success: true
     }
   })())
 }

 function dispatchShopCreateError(dispatch) {
   dispatch((() => {
     return {
       type: constants.CREATE_SHOP,
       success: false
     }
   })())
 }

 function dispatchProductAdded(txObj, dispatch) {
   dispatch((() => {
     return {
       type: constants.ADD_PRODUCT,
       addProductTX: txObj.tx,
       productID: txObj.logs[0].args.eIDRef,
       productName: txObj.logs[0].args.eName,
       productPrice: txObj.logs[0].args.ePrice,
       productStock: txObj.logs[0].args.eStock,
       idAdded: true
     }
   })())
 }

 function dispatchProductAddedError(dispatch) {
   dispatch((() => {
     return {
       type: constants.ADD_PRODUCT,
       idAdded: false
     }
   })())
 }

function dispatchBuyProduct(txObj, dispatch) {
  dispatch((() => {
    return {
      type: constants.BUY_PRODUCT,
      purchaseTX: txObj.tx,
      purchaseID: txObj.logs[0].args.eIDRef,
      purchaseName: txObj.logs[0].args.eName,
      purchasePrice: txObj.logs[0].args.ePrice,
      purchaseStock: txObj.logs[0].args.eStock
    }
  })())
}

 function dispatchGetProduct(IdRefArray, dispatch) {
   dispatch((() => {
     return {
       type: constants.GET_PRODUCT,
       productObj: IdRefArray
     }
   })())
 }

 function dispatchQueryProduct(RefId, IdRefArray, dispatch) {
   dispatch((() => {
     return {
       type: constants.QUERY_PRODUCT,
       productRefId: RefId,
       productName: IdRefArray[0],
       productPrice: parseInt(IdRefArray[1]),
       productStock: parseInt(IdRefArray[2]),
     }
   })())
 }

 function dispatchResetProductList(dispatch) {
   dispatch((() => {
     return {
       type: constants.RESET_PRODUCTS
     }
   })())
 }

 function dispatchGetTotalNumberOfProducts(idTotal, dispatch) {
   dispatch((() => {
     return {
       type: constants.GET_TOTAL_PRODUCTS,
       totalProducts: idTotal
     }
   })())
 }

 function dispatchBanUserAddress(txObj, dispatch) {
   dispatch((() => {
     return {
       type: constants.BANNED_USER,
       banned: txObj.logs[0].args.eBanAddress
     }
   })())
 }

 function dispatchGetAdmin(adminAddress, dispatch) {
   dispatch((() => {
     return {
       type: constants.GET_ADMIN,
       adminAddress: adminAddress
     }
   })())
 }

 function dispatchContractAddress(contractAddress, dispatch) {
   dispatch((() => {
     return {
       type: constants.GET_CONTRACT_ADDRESS,
       contractAddress: contractAddress
     }
   })())
 }

function dispatchTogglePurchaseModal(toggleValue, dispatch) {
  dispatch((() => {
    return {
      type: constants.TOGGLE_PURCHASE_MODAL,
      togglePurchaseModal: toggleValue
    }
  })())
}
 /**
  * Exports
  */

export function createShop(expiration) {
  return (dispatch, getState) => {
    const { web3Provider, account } = getState().provider
    const ShopFrontContract = contract(ShopFront)

    ShopFrontContract.setProvider(web3Provider.currentProvider)
    ShopFrontContract.defaults({from: account})

    var contractInstance = contractHelper(ShopFrontContract);

    return new Promise(resolve => {
      setupShop(contractInstance, account, expiration, resolve)
    })
    .then(tx => {
      if(tx) {
        dispatchShopCreated(tx, expiration, dispatch)
      } else {
        dispatchShopCreateError(dispatch)
      }
    })
  }
}

export function addProductToShop(name, price, stock) {
  return (dispatch, getState) => {
    const { web3Provider, account } = getState().provider
    const ShopFrontContract = contract(ShopFront)

    ShopFrontContract.setProvider(web3Provider.currentProvider)
    ShopFrontContract.defaults({from: account})

    var contractInstance = contractHelper(ShopFrontContract);

    return new Promise(resolve => {
      addProductToContract(contractInstance, account, name, price, stock, resolve)
    })
    .then(txObj => {
      if(txObj) {
        dispatchProductAdded(txObj, dispatch)
      } else {
        dispatchProductAddedError(dispatch)
      }
    })
  }
}

export function updateProductToShop(refID, name, price, stock) {
  return (dispatch, getState) => {
    const { web3Provider, account } = getState().provider
    const ShopFrontContract = contract(ShopFront)

    ShopFrontContract.setProvider(web3Provider.currentProvider)
    ShopFrontContract.defaults({from: account})

    var contractInstance = contractHelper(ShopFrontContract);

    return new Promise(resolve => {
      updateProductToContract(contractInstance, account, refID, name, price, stock, resolve)
    })
    .then(txObj => {
      if(txObj) {
        dispatchProductAdded(txObj, dispatch)
      } else {
        dispatchProductAddedError(dispatch)
      }
    })
  }
}

export function getNumberOfProductsFromShop() {
  return (dispatch, getState) => {
    const { web3Provider, account } = getState().provider
    const ShopFrontContract = contract(ShopFront)

    ShopFrontContract.setProvider(web3Provider.currentProvider)
    ShopFrontContract.defaults({from: account})

    var contractInstance = contractHelper(ShopFrontContract);

    return new Promise(resolve => {
      getNumberOfProductsFromContract(contractInstance, account, resolve)
    })
    .then(idTotal => {
      if(idTotal) {
        dispatchGetTotalNumberOfProducts(idTotal, dispatch)
      }
    })
  }
}

export function getProductFromShop(refID) {
  return (dispatch, getState) => {
    const { web3Provider, account } = getState().provider
    const ShopFrontContract = contract(ShopFront)

    ShopFrontContract.setProvider(web3Provider.currentProvider)
    ShopFrontContract.defaults({from: account})

    var contractInstance = contractHelper(ShopFrontContract);

    return new Promise(resolve => {
      getProductFromContract(contractInstance, account, refID, resolve)
    })
    .then(idArray => {
      if(idArray) {
        dispatchQueryProduct(refID,idArray, dispatch)
      }
    })
  }
}

export function initProductList() {
  return (dispatch) => {
    dispatchInitProductList(dispatch)
  }
}

export function resetProductList() {
  return (dispatch) => {
    dispatchResetProductList(dispatch)
  }
}

export function resetLocalProductList() {
  return (dispatch, getState) => {
    const { web3Provider, account } = getState().provider
    const ShopFrontContract = contract(ShopFront)

    ShopFrontContract.setProvider(web3Provider.currentProvider)
    ShopFrontContract.defaults({from: account})

    var contractInstance = contractHelper(ShopFrontContract);

    dispatchResetProductList(dispatch)

    return new Promise(resolve => {
      getNumberOfProductsFromContract(contractInstance, account, resolve)
    })
    .then(idTotal => {
      if(idTotal) {
        dispatchGetTotalNumberOfProducts(idTotal, dispatch)
        for(let i=1, p = Promise.resolve(); i <= idTotal; i++) {
          p = p.then(_ => {
            new Promise(resolve => {
              getProductFromContract(contractInstance, account, i, resolve)
            })
            .then(idArray => {
              if(idArray) {
                dispatchGetProduct(idArray, dispatch)
              }
            })
          })
        }
      }
    })
  }
}

export function buyProductFromShop(refID, price, qty) {
  return (dispatch, getState) => {
    const { web3Provider, account } = getState().provider
    const ShopFrontContract = contract(ShopFront)

    ShopFrontContract.setProvider(web3Provider.currentProvider)
    ShopFrontContract.defaults({from: account})

    var contractInstance = contractHelper(ShopFrontContract);

    return new Promise(resolve => {
      buyProductFromContract(contractInstance, account, refID, price, qty, resolve)
    })
    .then(txObj => {
      if(txObj) {
        dispatchBuyProduct(txObj, dispatch)
      }
    })
  }
}

export function banUserAddress(bannedAddress) {
  return (dispatch, getState) => {
    const { web3Provider, account } = getState().provider
    const ShopFrontContract = contract(ShopFront)

    ShopFrontContract.setProvider(web3Provider.currentProvider)
    ShopFrontContract.defaults({from: account})

    var contractInstance = contractHelper(ShopFrontContract);

    return new Promise(resolve => {
      banThisUser(contractInstance, account, bannedAddress, resolve)
    })
    .then(txObj => {
      if(txObj) {
        dispatchBanUserAddress(txObj, dispatch)
      }
    })
  }
}

export function getAdminFromShop() {
  return (dispatch, getState) => {
    const { web3Provider, account } = getState().provider
    const ShopFrontContract = contract(ShopFront)

    ShopFrontContract.setProvider(web3Provider.currentProvider)
    ShopFrontContract.defaults({from: account})

    var contractInstance = contractHelper(ShopFrontContract);

    return new Promise(resolve => {
      getAdmin(contractInstance, account, resolve)
    })
    .then(adminAddress => {
      if(adminAddress) {
        dispatchGetAdmin(adminAddress, dispatch)
      }
    })
  }
}

export function getContractAddress() {
  return (dispatch, getState) => {
    const { web3Provider, account } = getState().provider
    const ShopFrontContract = contract(ShopFront)

    ShopFrontContract.setProvider(web3Provider.currentProvider)
    ShopFrontContract.defaults({from: account})

    var contractInstance = contractHelper(ShopFrontContract);

    return new Promise(resolve => {
      getAddressFromContract(contractInstance, account, resolve)
    })
    .then(contractAddress => {
      if(contractAddress) {
        dispatchContractAddress(contractAddress, dispatch)
      }
    })
  }
}

export function togglePurchaseModal(toggleValue) {
  return (dispatch) => {
    dispatchTogglePurchaseModal(toggleValue, dispatch)
  }
}
