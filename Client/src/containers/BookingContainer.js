import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/BookingActions';

import RoomCategories from '../components/booking/RoomCategories.jsx';
import Booking from '../components/booking/Booking.jsx';

class BookingContainer extends Component {
  render() {
    const { view, app, actions, params: { id }, profile } = this.props;
    if (id) {
      return (
        <Booking id={id} {...app} {...actions} {...view} profile={profile} />
      );
    } else {
      return (
        <RoomCategories {...view} {...actions} profile={profile} />
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