import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract'

class GetAccount extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.contract.createdTX !== this.props.contract.createdTX) {
      this.props.actions.contract.getAdminFromShop()
    }
  }

  render() {
    const { account } = this.props.provider
    return (
      <div className={styles}>
        <ul>
            Your Account: { account }
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(GetAccount);
