import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/AppActions';

import BookingOrder from '../components/bookingOrder/BookingOrder.jsx';

class BookingContainer extends Component {
  render() {
    const { app, actions } = this.props;
    return (
      <BookingOrder {...app} {...actions} />
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.AppReducer
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingContainer);