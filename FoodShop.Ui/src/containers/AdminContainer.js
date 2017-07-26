import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminPage from '../components/admin/AdminPage.jsx';

class AdminContainer extends Component {
    render() {
        const { view, app, actions } = this.props;
        return (
            <AdminPage {...view} {...app} actions={actions} />
        );
    }
}

export default connect()(AdminContainer);