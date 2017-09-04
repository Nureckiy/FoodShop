import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/ManageActions';

import ManageOrders from '../components/manage/ManageOrders.jsx';
import Header from '../components/layout/Header.jsx';

class ManageOrdersContainer extends Component {
  render() {
    const { view, actions, translate } = this.props;
    return (
      <div>
        <Header />
        <ManageOrders {...actions} {...view} translate={translate} />
      </div>
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