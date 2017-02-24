import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/BasketActions';
import * as appActions from '../actions/AppActions';

import Basket from '../components/basket/Basket.jsx';

class BasketContainer extends Component {
  render() {
    const { view, app, actions, auth } = this.props;
    return (
      <Basket {...view} {...app} {...actions} auth={auth} />
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.BasketReducer
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(actions, appActions), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketContainer);