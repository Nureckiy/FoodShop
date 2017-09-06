import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from '../actions/AuthActions';

class AuthContainer extends React.Component {
  componentDidMount() {
    const { profile, authActions: { login } } = this.props;
    if (!profile) {
      login();
    }
  }
  render() {
    const { profile, children, authActions, translate } = this.props;
    if (!profile) {
      return null;
    }
    return React.cloneElement(children, { authActions, profile, translate });
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(state => state, mapDispatchToProps)(AuthContainer);