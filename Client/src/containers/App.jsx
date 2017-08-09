import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { i18nActions } from 'redux-react-i18n';

import * as actions from '../actions/AppActions';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer.jsx';

class App extends Component {
  render() {
    let { children, app, actions, auth: { profile }, authActions, location: { pathname }, localize } = this.props;
    if (children) {
      children = React.cloneElement(children, { profile, app, actions, authActions });
    }
    return (
      <div>
        <Navbar profile={profile} authActions={authActions} pathname={pathname} {...localize} />
          {children}
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.AppReducer,
    auth: state.AuthReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    localize: bindActionCreators(i18nActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
