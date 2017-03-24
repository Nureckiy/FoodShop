import React, { Component } from 'react';
import dateformat from 'dateformat';

class BookingTotal extends Component {
  renderDate({ arrivalDate, departureDate }) {
    let format = (date) => dateformat(date, 'dddd, mmmm dS');
    return `${format(arrivalDate)} - ${format(departureDate)}`;
  }
  countTotal(room) {
    if (room.arrivalDate && room.departureDate) {
      const daysCount = room.departureDate.diff(room.arrivalDate, 'days');
      return room.price * daysCount;
    }
  }
  render() {
    const { selected, onRemove } = this.props;
    return(
      <div className="col-md-10 col-md-offset-2 date-form">
        <ul className="col-md-8 date-form room-list">
          {selected.map(room =>
            <li key={room.id}>
              <strong className="black"><i>{room.category.name} ({this.renderDate(room)})</i></strong> <span className="cursive-font">${this.countTotal(room)}</span>
              <button type="button" className="btn-icon" onClick={() => onRemove(room.id)}>
                <span className="glyphicon glyphicon-remove grey-remove"/>
              </button>
            </li>
          )}
        </ul>
        <div className="col-md-4 date-form">
          <a className="btn btn-primary" href="#/order">Забронировать</a>
        </div>
      </div>
    );
  }
}

export default BookingTotal;