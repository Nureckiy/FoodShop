import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/BookingActions';
import RoomCategories from '../components/roomCategories/RoomCategories.jsx';

class RoomCategoriesContainer extends Component {
  render() {
    const { view, actions, profile, translate } = this.props;
    return (
      <RoomCategories {...view} {...actions} profile={profile} translate={translate} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomCategoriesContainer);