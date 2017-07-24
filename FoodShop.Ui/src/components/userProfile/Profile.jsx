/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import Header from '../layout/Header.jsx';
import { Tabs, Tab, MenuItem, Button, Row, Col, Nav, NavItem } from 'react-bootstrap';
import ViewProfile from './ViewProfile.jsx';
import EditProfile from './EditProfile.jsx';
import BookingsList from './BookingsList.jsx';
import Activities from './Activities.jsx';
import history from '../../store/History';

class Profile extends Component {
  render() {
    const { getBookings, getOrders, bookings, orders, auth, auth: { updateProfile, logout } } = this.props;
    const profile = auth.getProfile();
    const profileInfo = Object.assign({ login: profile.name, email: profile.email, id: profile.user_id }, profile.user_metadata );
    return (
      <div>
        <Header
           backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg"
           className="cut"
        />
        <div className="container content">
          <Tab.Container id="view-profile" defaultActiveKey="1">
              <Row>
                <Col sm={12}>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey="1">Профиль</NavItem>
                    <NavItem eventKey="2">Настройки</NavItem>
                    <NavItem eventKey="3">Брони</NavItem>
                    <NavItem eventKey="4">Активность</NavItem>
                    <NavItem className="pull-right" onClick={logout}>Выйти</NavItem>
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content animation mountOnEnter>
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