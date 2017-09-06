import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/BookingActions';

import BookingOrder from '../components/bookingOrder/BookingOrder.jsx';

class BookingOrderContainer extends Component {
  render() {
    const { view, actions, translate } = this.props;
    return (
      <BookingOrder {...view} {...actions} translate={translate} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingOrderContainer);