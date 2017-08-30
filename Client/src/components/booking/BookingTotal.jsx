import React from 'react';
import { Button } from 'react-bootstrap';

import * as utils from '../../utils/utils';

const BookingTotal = ({ selected, onRemove }) => (
  <div className="row col-md-10 col-md-offset-2 date-form">
    <ul className="col-md-8 date-form room-list">
      {selected.map(room =>
        <li key={room.id}>
          <span className="glyphicon glyphicon-calendar" />
          {dateformat(room)} { room.category.name } (${utils.calculateRoomTotal(room)})
          <Button type="button" className="btn-icon" onClick={() => onRemove(room.id)}>
            <span className="glyphicon glyphicon-remove grey-remove"/>
          </Button>
        </li>
      )}
    </ul>
    <div className="col-md-4 date-form">
      <a className="btn btn-orange" href="#/order">Забронировать</a>
    </div>
  </div>
);

const dateformat = ({ arrivalDate, departureDate }) =>
  `${utils.clippedDateFormat(arrivalDate)} - ${utils.clippedDateFormat(departureDate)}`;

export default BookingTotal;