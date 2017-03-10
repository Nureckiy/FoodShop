/*eslint no-unused-vars: "off"*/
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/AppActions';

import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer.jsx';

class App extends Component {
  componentWillMount() {
    this.props.route.auth.refreshProfile();
  }
  render() {
    const { auth } = this.props.route;
    let { children, app, actions } = this.props;
    if (children) {
      children = React.cloneElement(children, { auth, app, actions });
    }
    return (
      <div>
        <Navigation auth={auth} />
        {children}
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.AppReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
