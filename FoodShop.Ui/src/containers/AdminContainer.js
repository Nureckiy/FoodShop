import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/AdminActions';

import AdminPage from '../components/admin/AdminPage.jsx';

class AdminContainer extends Component {
    render() {
        const { view, app, actions } = this.props;
        return (
            <AdminPage {...view} {...app} actions={actions} />
        );
    }
}

function mapStateToProps(state) {
    return {
        view: state.AdminReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);