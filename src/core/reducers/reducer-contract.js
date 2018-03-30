import constants from 'core/types'

const initialState = {
  createdTX: null,
  expiration: 0,
  success: false,
  contractAddress: '',
  adminAddress: '',
  addProductTX: null,
  productID: 0,
  productName: '',
  productPrice: 0,
  productStock: 0,
  idAdded: false,
  banned: '',
  productRefId: 0,
  totalProducts: 0,
  products: [],
  purchaseTX: '',
  purchaseID: 0,
  purchaseName: '',
  purchasePrice: 0,
  purchaseStock: 0,
  purchaseModal: false
}

export function contractReducer(state = initialState, action) {
  switch (action.type) {

  case constants.CREATE_SHOP:
    return Object.assign({}, state, {
      createdTX: action.transaction,
      expiration: action.expiration,
      success: action.success
    })
  case constants.ADD_PRODUCT:
    return Object.assign({}, state, {
      addProductTX: action.addProductTX,
      productID: action.productID,
      productName: action.productName,
      productPrice: action.productPrice,
      productStock: action.productStock,
      isAdded: action.isAdded
    })
  case constants.BUY_PRODUCT:
    return Object.assign({}, state, {
      purchaseTX: action.purchaseTX,
      purchaseID: action.purchaseID,
      purchaseName: action.purchaseName,
      purchasePrice: action.purchasePrice,
      purchaseStock: action.purchaseStock
    })
    case constants.QUERY_PRODUCT:
      return Object.assign({}, state, {
        productName: action.productName,
        productPrice: action.productPrice,
        productStock: action.productStock
      })
  case constants.GET_PRODUCT:
    const len = state.products.length
    const newProductList = state.products.slice();
    newProductList.splice(len, 0, action.productObj);

    return Object.assign({}, state, {
      products: newProductList
      })
  case constants.RESET_PRODUCTS:
    return Object.assign({}, state, {
      products: []
    })
  case constants.GET_CONTRACT_ADDRESS:
    return Object.assign({}, state, {
      contractAddress: action.contractAddress
    })
  case constants.GET_TOTAL_PRODUCTS:
    return Object.assign({}, state, {
      totalProducts: action.totalProducts
    })
  case constants.GET_ADMIN:
    return Object.assign({}, state, {
      adminAddress: action.adminAddress
    })
  case constants.BANNED_USER:
    return Object.assign({}, state, {
      banned: action.banned
    })
  case constants.TOGGLE_PURCHASE_MODAL:
    return Object.assign({}, state, {
      purchaseModal: action.togglePurchaseModal
    })

  default:
    return state
  }
}
