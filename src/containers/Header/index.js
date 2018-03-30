import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar                 from 'components/AppBar';
import Button                 from 'components/Button';

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui';

/* component styles */
import { styles } from './styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleToggle=() => {
    this.props.actions.ui.openNav();
  }

  render() {
    return (
      <div className={styles}>
        <header>
          <AppBar
            title="React Dapp Boilerplate"
            onLeftIconButtonTouchTap={this.handleToggle} />
            <div id="header-btn1">
              <a href="https://github.com/hackingbeauty/react-dapp-boilerplate"><Button label="SOURCE CODE" flat={true} /></a>
            </div>
            <div id="header-btn2" >
              <a href="https://github.com/hackingbeauty/react-dapp-boilerplate/blob/master/README.md"><Button label="DOCS" flat={true} /></a>
            </div>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);