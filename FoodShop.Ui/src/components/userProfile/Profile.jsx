/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import Header from '../layout/Header.jsx';
import ViewProfile from './ViewProfile.jsx';
import EditProfile from './EditProfile.jsx';
import SubscriptionManagement from './SubscriptionManagement.jsx';
import * as utils from '../../utils/utils';
import { ButtonToolbar, DropdownButton, MenuItem, FormControl } from 'react-bootstrap';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
    this.handleTabSelected = this.handleTabSelected.bind(this);
    this.goToView = this.goToView.bind(this);
  }
  componentWillMount() {
    const { getSubscriptions, getOrders, auth } = this.props;
    getSubscriptions(auth.getProfile().user_id);
    getOrders();
  }
  renderChild() {
    const { auth, orders, userSubscriptions, subscriptions, getAllSubscriptions, saveUserSubscriptions } = this.props;
    const { activeTab } = this.state;
    const profile = auth.getProfile();
    switch(activeTab) {
      case 0:
        return (
          <ViewProfile
            profile={profile}
            userSubscriptions={userSubscriptions}
            orders={orders}
          />
        );
      case 1:
        return (
          <EditProfile auth={auth} onCancel={this.goToView} />
        );
      case 2:
        return (
          <SubscriptionManagement
            profile={profile}
            userSubscriptions={userSubscriptions}
            subscriptions={subscriptions}
            getAllSubscriptions={getAllSubscriptions}
            onSave={saveUserSubscriptions}
          />
        );
    }
  }
  handleTabSelected(activeTab) {
    this.setState({ activeTab });
  }
  goToView() {
    this.setState({ activeTab: 0 });
  }
  render() {
    const { auth } = this.props;
    const profile = auth.getProfile();
    const child = this.renderChild();
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg"
          className="cut"
        />
        <div className="container user-section content">
          <div className="row summary">
            <div className="col-sm-4">
              <img src={profile.picture} alt="user" className="img-circle img-responsive" />
            </div>
            <div className="pull-right">
              <ButtonToolbar>
                <DropdownButton className="btn btn-default" title="Опции" id="options" >
                  <MenuItem eventKey="0" onClick={() => this.handleTabSelected(0)}>Просмотр профиля</MenuItem>
                  <MenuItem eventKey="1" onClick={() => this.handleTabSelected(1)}>Редактировать профиль</MenuItem>
                  <MenuItem eventKey="2" onClick={() => this.handleTabSelected(2)}>Управление подписками</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="3" onClick={auth.logout}>Выйти</MenuItem>
                </DropdownButton>
              </ButtonToolbar>
            </div>
            <h3>{profile.nickname}</h3>
            <small>С нами с {profile.signed_up}</small>
          </div>
          <div className="row">
          { child }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;