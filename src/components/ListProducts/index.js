import  React, { Component }    from  'react'
import  { connect }             from  'react-redux'
import  { bindActionCreators }  from  'redux'
import  { Link }                from  'react-router-dom'
import  Web3                    from  'web3'
import  GetProduct              from  'components/GetProduct'
import InitProductList          from  'components/InitProductList'

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract'

class ListProducts extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.contract.addProductTX !== this.props.contract.addProductTX) {
      this.props.actions.contract.resetLocalProductList()
    }
  }

  getAllProducts() {
    const { contract } = this.props
    const productElement = contract.products.map((productItem, index) => {
      var productName = Web3.utils.toAscii(productItem[0])
      return (
        <Link key={`product-${index+1}`} to={`/product/${index+1}`}>
            <GetProduct
              refID={index + 1}
              name={productName}
            />
      </Link>
      )
    })
    return productElement
  }

  displayProducts() {
    const { products } = this.props.contract
    if ( products.length ) {
      const productElements = this.getAllProducts()
      return (
        <ul>{ productElements }</ul>
      )
    }
  }

  render() {
    const products = this.displayProducts()
    return (
      <div className={styles}>
        { products }
        <InitProductList />
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
