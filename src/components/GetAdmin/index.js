import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import RaisedButton           from 'material-ui/RaisedButton';

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract'

class GetAdmin extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { actions, provider, contract } = this.props
    if(nextProps.provider.web3Provider !== null && contract.adminAddress === "") {
      this.getAdminAddress()
    }
  }

  getAdminAddress() {
    const { actions, contract } = this.props
    if(contract.adminAddress === "0x0000000000000000000000000000000000000000") {
      actions.contract.getAdminFromShop()
    }
  }

  render() {
    const { contract } = this.props
    this.getAdminAddress()
    return (
      <div className={styles}>
        Shop Admin: { contract.adminAddress }
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

export default connect(mapStateToProps, mapDispatchToProps)(GetAdmin);
