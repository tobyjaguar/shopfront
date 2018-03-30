import React, { Component }  from 'react';
import { connect }           from 'react-redux';
import injectTapEventPlugin  from 'react-tap-event-plugin';
import getMuiTheme           from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider      from 'material-ui/styles/MuiThemeProvider';

// global styles for entire app
import './styles/app.scss';

/* application containers */
import Header     from 'containers/Header';
import LeftNavBar from 'containers/LeftNavBar';
import Home       from 'containers/Home';
import Footer     from 'containers/Footer';

injectTapEventPlugin();

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Header />
          <Home />
          <LeftNavBar />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null)(App);