import React, { Component }   from  'react'
import { connect }            from  'react-redux'
import { bindActionCreators } from  'redux'
import { withRouter }         from  'react-router-dom';
import RaisedButton           from  'material-ui/RaisedButton';
import Web3                   from  'web3'

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract'

/* components */
import  GetAccount           from  'components/GetAccount'
import  GetShop              from  'components/GetShop'
import  GetAdmin             from  'components/GetAdmin'
import  Modal                from  'components/Modal'

class ProductView extends Component {
  constructor(props) {
    super(props)
    this.state={
      init: false,
      contract_ref_id: 0,
      product_id: 0,
      name: '',
      price: 0,
      stock: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { provider, contract } = this.props
    if(nextProps.contract.purchaseTX !== contract.purchaseTX) {
      this.props.actions.contract.togglePurchaseModal(true)
    }
    if(nextProps.provider.web3Provider !== provider.web3Provider) {
      this.getProduct()
    }
    if(nextProps.contract.productStock !== contract.productStock) {
      this.setProductView()
    }
  }

  componentDidUpdate(prevProps) {
    const { contract } = this.props
    if(prevProps.contract.productStock !== contract.productStock) {
      this.setProductView()
    }
  }

  componentDidMount() {
    const { actions, history, provider} = this.props
    actions.contract.pushRoute(history.location.pathname)
    if(provider.web3Provider !== null) {
      this.getProduct()
    }
  }

  componentWillUnmount() {
    this.resetLocalProduct()
  }

  resetLocalProduct() {
    const { actions } = this.props
    actions.contract.resetProduct()
  }

  getProduct() {
    const { match, actions } = this.props
    actions.contract.getProductFromShop(match.params.idRef)
  }

  setProductView() {
    const { match, contract } = this.props
    this.setState({
      contract_ref_id: parseInt(match.params.idRef),
      product_id: contract.productRefId,
      name: this.groomName(),
      price: parseInt(contract.productPrice),
      stock: parseInt(contract.productStock)
    })
  }

  purchaseProduct=() => {
    const { actions } = this.props
    if (this.state.stock > 0) {
      actions.contract.buyProductFromShop(this.state.contract_ref_id, this.state.price+1, 1)
    }
  }

  groomName() {
    const { contract } = this.props
    if(contract.productName !== '') {
      return Web3.utils.toAscii(contract.productName)
    } else {
      return 'product name error'
    }
  }

  openModal=() => {
    this.props.actions.contract.togglePurchaseModal(true)
  }

  render() {
    const { contract } = this.props
    const cleanProductName = this.groomName()
    const cleanProductPrice = parseInt(contract.productPrice) + 1
    const modalContent = (
      <div>
        <p>Congrats on your purchase! The transaction has been submitted
        to the network.</p>
        <div id="features" className="section">
          <span className="label">
            <li key="name">
              <h3>Product: {cleanProductName}</h3>
            </li>
            <li key="price">
              <h3>Price: {cleanProductPrice} wei</h3>
            </li>
            <li key="tx">
              <h4>TX: {contract.purchaseTX}</h4>
            </li>
          </span>
        </div>
      <p>All inventory reflects the state of the contract from the
      last mined block.</p>
     </div>
    )

    return (
      <div className={styles}>
      <div id="banner">
        <div className="container">
            <GetAccount />
            <GetShop />
            <GetAdmin />
        </div>
      </div>
        <div id="getting-started" className="section">
            <span className="label">Product: {this.state.name}</span>
            <div>
              Price: {this.state.price+1}
            </div>
            <div>
              Stock: {this.state.stock}
            </div>
        <RaisedButton
          className="btn"
          label="Buy"
          backgroundColor="#ffa000"
          onClick={this.purchaseProduct}
        />
      </div>
      <Modal title="Purchase Submitted!" content={modalContent} />
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    provider: state.provider,
    contract: state.contract
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      contract: bindActionCreators(contractActionCreators, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductView));
