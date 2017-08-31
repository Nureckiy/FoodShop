import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/ManageActions';

import ManageBookings from '../components/manage/ManageBookings.jsx';
import Header from '../components/layout/Header.jsx';

class ManageBookingsContainer extends Component {
  render() {
    const { view, actions, translate } = this.props;
    return (
      <div>
        <Header style={{ backgroundColor: '#a5a5a5' }} />
        <ManageBookings {...actions} {...view} translate={translate} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookingsContainer);