import React, { Component } from 'react';

import thank from '../../sources/img/thank.png';

class BookingSuccess extends Component {
  render() {
    return (
      <div className="container content">
        <div className="row row text-center">
          <div className="col-md-8 col-md-offset-2">
            <h2 className="cursive-font primary-color">Спасибо!</h2>
            <p>Ваша бронь оформлена. В ближайшие 15 минут вам перезвонят для подтверждения заказа.</p>
          </div>
          <img src={thank} />
          <div className="row date-form">
            <a href="#" className="btn btn-warning">На главную</a>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingSuccess;