/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import RoomTile from '../common/RoomTile.jsx';

class BookingOrder extends Component {
  render() {
    const { selectedRooms } = this.props;
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/fon4_dg32ge.jpg"
          className="cut"/>
        <div className="container content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center title">
              <h2 className="cursive-font primary-color">Оформление брони</h2>
              <h1 className="cursive-font primary-color">Выбранные номера</h1>
            </div>
          </div>
          <div className="row">
            {selectedRooms.map(room =>
              <RoomTile key={room.id} {...room} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BookingOrder;