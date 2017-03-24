/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import OrderItem from './OrderItem.jsx';

class ViewProfile extends Component {
  renderOrders() {
    const { orders } = this.props;
    let closed = [];
    let open = [];
    orders.map(order => {
      if (order.Closed) {
        closed.push(order);
      } else {
        open.push(order);
      }
    });
    return (
      <div>
        <h4>Текущие заказы</h4>
        <ul>
          { open.map(order => <OrderItem key={order.Id} order={order}/>) }
        </ul>
        <h4>Завершенные заказы</h4>
        <ul>
          { closed.map(order => <OrderItem key={order.Id} order={order}/>) }
        </ul>
      </div>
    );
  }
  render() {
    const { profile, userSubscriptions } = this.props;
    const ordersTable = this.renderOrders();
    return (
      <div className="view-profile">
        <ul>
          <li><h3>{profile.name}</h3></li>
          <li><strong>E-mail:</strong> {profile.email}</li>
          <li><strong>Адрес:</strong> {profile.user_metadata && profile.user_metadata.address}</li>
          <li><strong>Телефон:</strong> {profile.user_metadata && profile.user_metadata.phoneNumber}</li>
          <li><strong>Подписки:</strong> {userSubscriptions.map(subscription =>
            <label key={subscription.Id} className="label label-info">{subscription.Name}</label>
          )}</li>
          <li><strong>Заказы:</strong></li>
          <li>{ ordersTable }</li>
        </ul>

      </div>
    );
  }
}

export default ViewProfile;