import React from 'react';

import Header from '../layout/Header.jsx';
import RoomTile from '../common/RoomTile.jsx';
import BookingSummaryControl from './BookingSummaryControl.jsx';
import BookingDetailsForm from './BookingDetailsForm.jsx';
import * as utils from '../../utils/utils';

const BookingOrder = ({ selectedRooms, deleteRoom, clearSelectedRooms, book, translate }) => (
  <div>
    <Header backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/fon4_dg32ge.jpg" />
    <div className="container content">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center title">
          <h2 className="cursive-font primary-color">{translate('bookingRegistration')}</h2>
          <h1 className="cursive-font primary-color">{translate('selectedRooms')}</h1>
        </div>
      </div>
      {selectedRooms.map(room =>
        <div key={room.id} className="top-indent row sample">
          <RoomTile {...room} translate={translate} className="col-md-9 col-sm-12 no-padding" />
          <BookingSummaryControl onSubmit={deleteRoom} {...room} translate={translate} className="col-md-3 col-sm-5" />
        </div>
      )}
      <div className="row">
        <div className="col-md-2 col-md-offset-2 date-form">
          <p><b>{translate('total')}:</b> <span className="cursive-font">${ utils.calculateBookingTotal(selectedRooms) }</span></p>
        </div>
        <div className="col-md-2 col-md-offset-6 date-form">
          <button type="button" onClick={clearSelectedRooms} className="btn col-md-12" >{translate('clear')}</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center gtco-heading cut-heading date-form">
          <h1 className="cursive-font primary-color">{translate('registrationPersonalData')}</h1>
        </div>
        <BookingDetailsForm selectedRooms={selectedRooms} book={book} translate={translate} />
      </div>
    </div>
  </div>
);

export default BookingOrder;