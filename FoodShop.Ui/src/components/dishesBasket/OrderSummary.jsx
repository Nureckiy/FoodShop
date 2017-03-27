import React, { Component } from 'react';

import thank from '../../sources/img/thank.png';

class OrderSummary extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h2 className="cursive-font primary-color">Спасибо!</h2>
            <p>Ваш заказ оформлен. В ближайшие 15 минут вам перезвонят для подтверждения заказа.</p>
          </div>
        </div>
        <div className="row animate-box thank">
          <img src={thank} />
          <div className="col-md-12 buttons">
            <a href="#/menu/" className="btn btn-warning">На главную</a>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderSummary;