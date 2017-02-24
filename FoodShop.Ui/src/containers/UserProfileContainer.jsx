import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/UserProfileActions';

import Profile from '../components/userProfile/Profile.jsx';

class UserProfileContainer extends Component {
  render() {
    const { view, app, actions, auth } = this.props;
    return (
      <Profile {...view} {...app} {...actions} auth={auth} />
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.UserProfileReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);