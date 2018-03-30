import  React, { Component }    from 'react'
import  { connect }             from 'react-redux'
import  { bindActionCreators }  from 'redux'

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract'
import * as providerActionCreators from 'core/actions/actions-provider'

class InitProductList extends Component {
  constructor(props) {
    super(props);
    this.state={
      initPList: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.provider.web3Provider !== null)
      this.initProductList()
  }

  initProductList() {
    const { actions, contract } = this.props
    if(this.state.initPList === false) {
      actions.contract.resetLocalProductList()
      this.setState({
        initPList: true
      })
    }
  }

  render() {
    return (
      <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(InitProductList);
