import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { i18nActions } from 'redux-react-i18n';

import * as actions from '../actions/AppActions';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer.jsx';

class App extends Component {
  componentWillMount() {
    this.updateLanguage(this.props);
  }
  componentWillReceiveProps(props) {
    this.updateLanguage(props);
  }
  updateLanguage({ auth, localize }) {
    if(auth.profile) {
      localize.setCurrentLanguage(auth.profile.user_metadata.language);
    }
  }
  render() {
    const { children, app, actions,  auth: { profile }, localize: { setCurrentLanguage },
      location: { pathname } } = this.props;
    return (
      <div>
        <Navbar profile={profile} pathname={pathname} onLanguageChange={setCurrentLanguage} />
          { React.cloneElement(children, { profile, app, actions, }) }
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
