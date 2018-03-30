import React, { Component } from  'react';
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'

/* components */
import img                  from  'assets/images/react-dapps.png'
import TextField            from  'components/TextField'
import Button               from  'components/Button'
import CreateShop           from  'components/CreateShop'
import GetAccount           from  'components/GetAccount'
import GetShop              from  'components/GetShop'
import GetAdmin             from  'components/GetAdmin'
import BanUser              from  'components/BanUser'
import AddProduct           from  'components/AddProduct'
import UpdateProduct        from  'components/UpdateProduct'
import ListProducts         from  'components/ListProducts'

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as uiActionCreators    from 'core/actions/actions-ui'
import * as contractActionCreators from 'core/actions/actions-contract'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { contract } = this.props
    return (
      <div className={styles}>
      <div id="banner">
        <div className="container">
            <GetAccount />
            <GetShop />
            <GetAdmin />
        </div>
      </div>
        <div className="container">
          <div id="getting-started" className="section">
            <h2>ShopFront Setup</h2>
              <span className="label">Create a new shop:</span>
                <CreateShop />
              <span className="label">Add a Product</span>
                <AddProduct />
              <span className="label">Update a Product</span>
                <UpdateProduct />
              <span className="label">Ban a User</span>
                <BanUser />
          </div>
        </div>
          <div id="features" className="container">
            <h2>Products:</h2>
            <div id="features" className="section">
              <ListProducts />
            </div>
          </div>
      </div>
    );
  }
}

Home.propTypes = {

}

function mapStateToProps(state) {
  return {
    provider: state.provider,
    contract: state.contract
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch),
      contract: bindActionCreators(contractActionCreators, dispatch)
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
