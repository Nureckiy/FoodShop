import React, { Component } from 'react';

class BookingsList extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Бронь от 26.03
        </div>
        <table className="table user-booking">
          <thead>
            <tr>
              <th>№ апартамента</th>
              <th>Тип</th>
              <th>Количество гостей</th>
              <th>Дата въезда</th>
              <th>Дата отбытия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default BookingsList;