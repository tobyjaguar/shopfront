import  React, { Component }   from 'react'
import  { connect }            from 'react-redux'
import  { bindActionCreators } from 'redux'
import  Web3                   from 'web3'
import  RaisedButton           from 'material-ui/RaisedButton';
import  TextField              from 'material-ui/TextField';

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract'

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
      stock: 0
    };
  }

  handleChange=(evt) => {
    switch (evt.target.id) {
    case 'product_name':
      return this.setState({
        name: evt.target.value
      })
    case 'product_price':
      return this.setState({
        price: evt.target.value
      })
    case 'product_stock':
      return this.setState({
        stock: evt.target.value
      })
    }
  }

  addProductToContract=() => {
    const { actions } = this.props
    const productName = Web3.utils.toHex(this.state.name)
    actions.contract.addProductToShop(productName, this.state.price, this.state.stock)
    this.setState({
      name: '',
      price: 0,
      stock: 0
    })
  }

  render() {
    return (
      <div className={styles}>
        <div className="section">
          <div>
          <span className="label"><h4>Product Name:</h4>
          <TextField
            id="product_name"
            type="text"
            value={this.state.name}
            inputStyle={{color: '#EEECEC'}}
            onChange={this.handleChange}
            />
          </span>
          <span className="label"><h4>Price:</h4>
          <TextField
            id="product_price"
            type="number"
            value={this.state.price}
            inputStyle={{color: '#EEECEC'}}
            onChange={this.handleChange}
            />
          </span>
          <span className="label"><h4>Stock:</h4>
          <TextField
            id="product_stock"
            type="number"
            value={this.state.stock}
            inputStyle={{color: '#EEECEC'}}
            onChange={this.handleChange}
            />
          </span>
        </div>
          <RaisedButton className="btn" label="Add" backgroundColor="#ffa000" onClick={this.addProductToContract} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
