import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/MenuActions';

import Basket from '../components/dishesBasket/Basket.jsx';

class BasketContainer extends Component {
  render() {
    const { view, app, actions, profile } = this.props;
    return (
      <Basket {...view} {...app} {...actions} profile={profile} />
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.MenuReducer
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketContainer);