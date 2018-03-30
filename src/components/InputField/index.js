import React, { Component }   from 'react';

/* component styles */
import { styles } from './styles.scss';

/* components */
import TextField from 'components/TextField';

export default class CreateShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  onChange=(evt) => {
    this.setState({
      value: evt.target.value
    });
  }

  render() {

    return (
      <div className={styles}>
        <TextField value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}
