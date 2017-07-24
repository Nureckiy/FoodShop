import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/BookingActions';

import BookingOrder from '../components/bookingOrder/BookingOrder.jsx';

class BookingContainer extends Component {
  render() {
    const { view, actions } = this.props;
    return (
      <BookingOrder {...view} {...actions} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingContainer);