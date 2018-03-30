import constants from 'core/types'

const initialState = {
  web3Provider  : null,
  account       : null
}

export function providerReducer(state = initialState, action) {
  switch (action.type) {

  case constants.SET_PROVIDER:
    return Object.assign({}, state, {
      web3Provider: action.provider
    })

  case constants.SET_ACCOUNT:
    return Object.assign({}, state, {
      account: action.accnt
    })

  default:
    return state
  }
}
