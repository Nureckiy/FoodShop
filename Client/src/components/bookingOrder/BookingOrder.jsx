import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import RoomTile from '../common/RoomTile.jsx';
import BookingSummaryControl from './BookingSummaryControl.jsx';
import BookingDetailsForm from './BookingDetailsForm.jsx';
import * as utils from '../../utils/utils';

class BookingOrder extends Component {
  render() {
    const { selectedRooms, deleteRoom, clearSelectedRooms, book } = this.props;
    return (
      <div>
        <Header backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/fon4_dg32ge.jpg" />
        <div className="container content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center title">
              <h2 className="cursive-font primary-color">Оформление брони</h2>
              <h1 className="cursive-font primary-color">Выбранные номера</h1>
            </div>
          </div>
          {selectedRooms.map(room =>
            <div key={room.id} className="row sample">
              <RoomTile {...room} className="col-md-10 col-sm-12" />
              <BookingSummaryControl onSubmit={deleteRoom} {...room} className="col-md-2 col-sm-4 date-form text-center" />
            </div>
          )}
          <div className="row">
            <div className="col-md-2 col-md-offset-2 date-form">
              <p><b>Итог:</b> <span className="cursive-font">${ utils.calculateBookingTotal(selectedRooms) }</span></p>
            </div>
            <div className="col-md-2 col-md-offset-6 date-form">
              <button type="button" onClick={clearSelectedRooms} className="btn col-md-12" >Очистить</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center gtco-heading cut-heading date-form">
              <h1 className="cursive-font primary-color">Регистрационные данные</h1>
            </div>
            <BookingDetailsForm selectedRooms={selectedRooms} book={book} />
          </div>
        </div>
      </div>
    );
  }
}

export default BookingOrder;