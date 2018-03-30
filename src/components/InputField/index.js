import React, { Component }   from 'react';
import PropTypes              from 'prop-types'

/* component styles */
import { styles } from './styles.scss';

/* components */
import TextField from 'components/TextField';

onChange=(evt) => {
  this.setState({
    value: evt.target.value
  });
}

export default class CreateShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    
    return (
      <div className={styles}>
        <TextField value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}

CreateShop.propTypes = {
}