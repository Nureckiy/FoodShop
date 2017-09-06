import React from 'react';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';

import Header from '../layout/Header.jsx';
import ViewProfile from './ViewProfile.jsx';
import EditProfile from './EditProfile.jsx';
import BookingsList from './BookingsList.jsx';
import Activities from './Activities.jsx';

const Profile = props => {
  const { getBookings, getOrders, bookings, orders, profile, updateProfile, logout, translate, activeRequestStatus } = props;
  const profileInfo = Object.assign({ login: profile.name, email: profile.email, id: profile.user_id }, profile.user_metadata );
  return (
    <div>
      <Header backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg" />
      <div className="container content">
        <Tab.Container id="view-profile" defaultActiveKey="1">
          <Row>
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="1">{translate('profile')}</NavItem>
                <NavItem eventKey="2">{translate('settings')}</NavItem>
                <NavItem eventKey="3">{translate('reservations')}</NavItem>
                <NavItem eventKey="4">{translate('activities')}</NavItem>
                <NavItem className="pull-right" onClick={logout}>{translate('logout')}</NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation mountOnEnter unmountOnExit>
                <Tab.Pane eventKey="1"><ViewProfile {...profileInfo} translate={translate} /></Tab.Pane>
                <Tab.Pane eventKey="2"><EditProfile initial={profileInfo} onSubmit={updateProfile} translate={translate} /></Tab.Pane>
                <Tab.Pane eventKey="3"><BookingsList load={getBookings} loading={activeRequestStatus} bookings={bookings} translate={translate} /></Tab.Pane>
                <Tab.Pane eventKey="4"><Activities load={getOrders} loading={activeRequestStatus} orders={orders} translate={translate} /></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
};

export default Profile;