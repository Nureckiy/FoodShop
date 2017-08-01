import React, { Component } from 'react';

import * as utils from '../../utils/utils';

class BookingTotal extends Component {
  render() {
    const { selected, onRemove } = this.props;
    const dateformat = ({ arrivalDate, departureDate }) =>
      `${utils.clippedDateFormat(arrivalDate)} - ${utils.clippedDateFormat(departureDate)}`;
    return(
      <div className="row col-md-10 col-md-offset-2 date-form">
        <ul className="col-md-8 date-form room-list">
          {selected.map(room =>
            <li key={room.id}>
              <span className="glyphicon glyphicon-calendar" />
              {dateformat(room)} { room.category.name } (${utils.calculateRoomTotal(room)})
              <button type="button" className="btn-icon" onClick={() => onRemove(room.id)}>
                <span className="glyphicon glyphicon-remove grey-remove"/>
              </button>
            </li>
          )}
        </ul>
        <div className="col-md-4 date-form">
          <a className="btn btn-orange" href="#/order">Забронировать</a>
        </div>
      </div>
    );
  }
}

export default BookingTotal;