import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/AppActions';

import ManageOrders from '../components/manage/ManageOrders.jsx';

class ManageOrdersContainer extends Component {
  render() {
    const { view, actions } = this.props;
    return (
      <ManageOrders {...actions} {...view} />
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.ManageReducer
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrdersContainer);