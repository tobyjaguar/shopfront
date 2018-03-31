import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract'

class GetAdmin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.provider.web3Provider !== this.props.provider.web3Provider)
    {
      this.getAdminAddress()
    }
  }

  componentDidMount() {
    const { contract } = this.props
    if(contract.adminAddress === ''){
      this.getAdminAddress()
    }
  }

  getAdminAddress() {
    const { actions, provider } = this.props
    if(provider.web3Provider !== null) {
      actions.contract.getAdminFromShop()
    }
  }

  render() {
    const { contract } = this.props
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
