import React, { Component } from 'react';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { Loc } from 'redux-react-i18n';

import Header from '../layout/Header.jsx';
import ViewProfile from './ViewProfile.jsx';
import EditProfile from './EditProfile.jsx';
import BookingsList from './BookingsList.jsx';
import Activities from './Activities.jsx';

class Profile extends Component {
  render() {
    const { getBookings, getOrders, bookings, orders, profile, updateProfile, logout } = this.props;
    const profileInfo = Object.assign({ login: profile.name, email: profile.email, id: profile.user_id }, profile.user_metadata );
    return (
      <div>
        <Header backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg" />
        <div className="container content">
          <Tab.Container id="view-profile" defaultActiveKey="1">
              <Row>
                <Col sm={12}>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey="1"><Loc locKey="profile" /></NavItem>
                    <NavItem eventKey="2"><Loc locKey="settings" /></NavItem>
                    <NavItem eventKey="3"><Loc locKey="reservations" /></NavItem>
                    <NavItem eventKey="4"><Loc locKey="activities" /></NavItem>
                    <NavItem className="pull-right" onClick={logout}><Loc locKey="logout" /></NavItem>
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content animation mountOnEnter unmountOnExit>
                    <Tab.Pane eventKey="1"><ViewProfile {...profileInfo} /></Tab.Pane>
                    <Tab.Pane eventKey="2"><EditProfile initial={profileInfo} onSubmit={updateProfile} /></Tab.Pane>
                    <Tab.Pane eventKey="3"><BookingsList load={getBookings} bookings={bookings} /></Tab.Pane>
                    <Tab.Pane eventKey="4"><Activities load={getOrders} orders={orders} /></Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
          </Tab.Container>
        </div>
      </div>
    );
  }
}

export default Profile;