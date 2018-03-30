import React, { Component }   from 'react';
import { bindActionCreators } from 'redux';
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux';
import RaisedButton       from 'material-ui/RaisedButton';
import TextField              from 'material-ui/TextField';

/* component styles */
import { styles } from './styles.scss';

/* components */

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract';

class CreateShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 5
    };
  }

  handleChange=(evt) => {
    this.setState({
      value: evt.target.value
    });
  }

  createShop=() => {
    const { actions } = this.props;
    actions.contract.createShop(this.state.value)
  }

  render() {
    return (
      <div className={styles}>
        <div className="section">
          <div>
          <span className="label">
            <TextField
              id="store_expiration"
              type="number"
              inputStyle={{color: '#EEECEC'}}
              value={this.state.value}
              onChange={this.handleChange}
              />
          </span>
          </div>
          <RaisedButton className="btn" label="Create" backgroundColor="#ffa000" onClick={this.createShop} />
        </div>
      </div>
    );
  }
}

CreateShop.propTypes = {
  value : PropTypes.number
}

function mapStateToProps(state) {
  return {
    provider: state.provider
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      contract: bindActionCreators(contractActionCreators, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateShop);
