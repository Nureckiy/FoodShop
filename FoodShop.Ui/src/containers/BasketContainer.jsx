import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/BasketActions';

import Basket from '../components/basket/Basket.jsx';

class BasketContainer extends Component {
  render() {
    const { view, app, actions } = this.props;
    const model = Object.assign({}, view, app);
    return (
      <Basket model={model} actions={actions} />
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
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketContainer);