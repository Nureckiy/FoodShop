import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/BookingActions';

import Rooms from '../components/booking/RoomCategories.jsx';
import Booking from '../components/booking/Booking.jsx';

class BookingContainer extends Component {
  render() {
    const { view, app, actions, params: { id }, auth } = this.props;
    if (id) {
      return (
        <Booking id={id} {...app} {...actions} {...view} auth={auth} />
      );
    } else {
      return (
        <Rooms {...view} {...actions} auth={auth} />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    view: state.BookingReducer
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingContainer);