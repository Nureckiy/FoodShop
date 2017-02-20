import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/LandingPageActions';

import Order from '../components/order/Order.jsx';

class OrderContainer extends Component {
  render() {
    const { view, app, actions } = this.props;
    const model = Object.assign({}, view, app);
    return (
      <Order model={model} actions={actions} />
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.OrderReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);