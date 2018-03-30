import  React, { Component }   from  'react';
import  { connect }            from  'react-redux';
import  { Link }               from  'react-router-dom'
import  { bindActionCreators } from  'redux';
import  AppBar                 from  'components/AppBar';
import  RaisedButton           from 'material-ui/RaisedButton';
import { withRouter }         from  'react-router-dom';

/*  components */
import  GetShop                from  'components/GetShop'
import  GetAdmin                from  'components/GetAdmin'

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

  linkHome=() => {
    const { history } = this.props
    history.push(`/shop`)
  }

  render() {
    return (
      <div className={styles}>
        <header>
          <AppBar
            title="Ethereum Shopfront"
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <div id="header-btn2">
            <RaisedButton
                   className="btn"
                   label="Return to Shop"
                   backgroundColor="#ffa000"
                   onClick={this.linkHome}
                 />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
