import React, { Component }         from 'react';
import { connect }                  from 'react-redux';

/* component styles */
import { styles } from './styles.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>
        <p>This project is currently maintained by <a href="https://github.com/hackingbeauty">hackingbeauty</a>.</p>
      </div>
    );
  }
}

export default connect(null, null)(Footer);