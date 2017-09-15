import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IntlActions, withTranslate } from 'react-redux-multilingual';

import * as actions from '../actions/AppActions';
import { refreshProfile } from '../actions/AuthActions';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer.jsx';

class App extends Component {
  componentDidMount() {
    this.updateLanguage(this.props);
    this.props.refreshProfile();
  }
  componentWillReceiveProps(props) {
    this.updateLanguage(props);
  }
  updateLanguage({ auth }) {
    if(auth.profile && auth.profile.user_metadata.language) {
      this.props.actions.setLocale(auth.profile.user_metadata.language);
    }
    document.title = this.props.translate('documentTitle');
  }
  render() {
    const { children, app, actions,  auth: { profile }, translate, location: { pathname } } = this.props;
    return (
      <div>
        <Navbar profile={profile} pathname={pathname} translate={translate} />
          { React.cloneElement(children, { profile, app, actions, translate }) }
        <Footer translate={translate}/>
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
    actions: bindActionCreators(Object.assign({}, actions, IntlActions), dispatch),
    refreshProfile: () => dispatch(refreshProfile())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(App));
