import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import RaisedButton           from 'material-ui/RaisedButton';

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract'
import * as providerActionCreators from 'core/actions/actions-provider'

class GetShop extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    const { actions, provider } = this.props

    if(prevProps.provider.web3Provider !== this.props.provider.web3Provider) {
      actions.contract.getContractAddress()
    }
  }

  render() {
    const { contract } = this.props

    return (
      <div className={styles}>
        <ul>
          Shop Address: { contract.contractAddress }
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
      provider: bindActionCreators(providerActionCreators, dispatch),
      contract: bindActionCreators(contractActionCreators, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetShop);
