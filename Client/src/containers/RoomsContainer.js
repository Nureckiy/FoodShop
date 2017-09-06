import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/BookingActions';
import Booking from '../components/rooms/Booking.jsx';

class RoomsContainer extends Component {
  render() {
    const { view, app, actions, params: { id }, profile, translate } = this.props;
    return (
      <Booking id={id} {...app} {...actions} {...view} profile={profile} translate={translate} />
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer);