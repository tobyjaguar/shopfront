import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import RaisedButton           from 'material-ui/RaisedButton';
import TextField              from 'material-ui/TextField';

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract'

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banned: ''
    };
  }

  handleChange=(evt) => {
    return this.setState({
      banned: evt.target.value
    })
  }

  banUserFromContract=() => {
    const { actions } = this.props
    actions.contract.banUserAddress(this.state.banned)
  }

  render() {
    const { contract } = this.props

    return (
      <div className={styles}>
        <div>
            <TextField
              id="banned"
              type="text"
              value={this.state.banned}
              onChange={this.handleChange}
              />
        </div>
          <RaisedButton className="btn" label="Ban" backgroundColor="#ffa000" onClick={this.banUserFromContract} />
        { contract.banned }
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
