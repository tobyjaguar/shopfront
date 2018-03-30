import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract'

class GetProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refID: 0,
      name: '',
      price: 0,
      stock: 0
    };
  }

  render() {
    return (
      <div className={styles}>
        <div className="label">{this.props.name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GetProduct);
