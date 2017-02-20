import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/LandingPageActions';

import LandingPage from '../components/landingPage/LandingPage.jsx';

class LandingContainer extends Component {
  render() {
    const { view, app, actions } = this.props;
    const model = Object.assign({}, view, app);
    return (
      <LandingPage model={model} actions={actions} />
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.LandingPageReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);