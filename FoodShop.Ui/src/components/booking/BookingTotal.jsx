/*eslint no-unused-vars: "off"*/

import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import dateformat from 'dateformat';

class BookingTotal extends Component {
  renderDate({ startDate, endDate }) {
    if (!startDate || !endDate) {
      return 'введена некорректная дата';
    }
    let format = (date) => dateformat(date, 'dddd, mmmm dS');
    return `${format(startDate)} - ${format(endDate)}`;
  }
  countTotal(room) {
    if (room.startDate && room.endDate) {
      const daysCount = room.endDate.diff(room.startDate, 'days');
      return room.price * daysCount;
    }
  }
  render() {
    const { onSubmit, selected, onRemove } = this.props;
    return(
      <Form onSubmit={onSubmit} bsClass="col-md-10 col-md-offset-2 date-form">
        <ul className="col-md-6 date-form room-list">
          {selected.map(room =>
            <li key={room.id}>
              <strong><i>{this.renderDate(room)}</i></strong> <span className="cursive-font">{this.countTotal(room)}</span>
              <button type="button" className="btn-icon" onClick={() => onRemove(room.id)}>
                <span className="glyphicon glyphicon-remove grey-remove" aria-hidden="true" />
              </button>
            </li>
          )}
        </ul>
        <div className="col-md-4 date-form">
          <input type="submit" value="Забронировать" className="btn btn-primary" />
        </div>
      </Form>
    );
  }
}

export default BookingTotal;