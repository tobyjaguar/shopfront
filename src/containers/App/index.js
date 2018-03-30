import React, { Component }   from 'react';
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux'
import injectTapEventPlugin   from 'react-tap-event-plugin';
import getMuiTheme            from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider';
import Web3                   from 'web3';
import { HashRouter,
         Route,
         Switch,
         Redirect }            from 'react-router-dom';

// global styles for entire app
import './styles/app.scss';

/* application containers */
import Header       from 'containers/Header';
import LeftNavBar   from 'containers/LeftNavBar';
import Home         from 'containers/Home';
import ProductView  from 'containers/ProductView';

/* actions */
import * as uiActionCreators       from 'core/actions/actions-ui';
import * as providerActionCreators from 'core/actions/actions-provider';

injectTapEventPlugin()

export class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { actions } = this.props

    var currentProvider
    var web3Provider
    /** ***** Set the Provider *******/
    if (typeof window.web3 !== 'undefined') {
      currentProvider = window.web3.currentProvider
      web3Provider = new Web3(currentProvider)
    } else {
      //use development blockchain
      currentProvider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
      web3Provider = new Web3(currentProvider)
    }
    actions.provider.setProvider(web3Provider)
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <div>
            <HashRouter>
              <div>
                <Header />
                <div className="container">
                  <Switch>
                    <Route path="/shop" component={Home} />
                    <Route path="/product/:idRef" component={ProductView} />
                    <Redirect from="/" to="/shop"/>
                  </Switch>
                </div>
                <LeftNavBar />
              </div>
            </HashRouter>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object,
  ui: PropTypes.object
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch),
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
