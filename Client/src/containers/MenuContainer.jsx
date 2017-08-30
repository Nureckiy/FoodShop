import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/MenuActions';
import * as appActions from '../actions/AppActions';

import Menu from '../components/menus/Menu.jsx';

class MenusContainer extends Component {
  render() {
    const { view, app, actions, params, profile, translate } = this.props;
    const model = Object.assign({}, view, app);
    return (
      <Menu model={model} actions={actions} {...params} profile={profile} translate={translate} />
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
    actions: bindActionCreators(Object.assign(actions, appActions), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenusContainer);

