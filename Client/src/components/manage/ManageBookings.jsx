import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';

import ManageTable from './ManageTable.jsx';
import * as utils from '../../utils/utils';

class ManageBookings extends Component {
  componentWillMount() {
    const { getBookings } = this.props;
    getBookings();
  }

  render() {
    const { bookings, activeRequestStatus, bookingsInProcess, changeBookingStatus } = this.props;
    const titles = ['Зарегистрирован', 'Пользователь', 'Email', 'Телефон', 'Итого'];
    return (
      <ManageTable
        items={bookings}
        titles={titles}
        onStatusChange={changeBookingStatus}
        getHeaderValues={this.getHeaderValues}
        renderBody={this.renderBody}
        activeRequestStatus={activeRequestStatus}
        processedItems={bookingsInProcess}
      />
    );
  }

  getHeaderValues(booking) {
    const { registrationTime, name, email, phone, total } = booking;
    return [ utils.fullDateFormat(registrationTime), name, email, phone, `$${total}` ];
  }

  renderBody(booking) {
    const { statusUpdatedBy, statusUpdatedDate, rooms } = booking;
    return (
      <ListGroup>
        <ListGroupItem>Последние изменения: { statusUpdatedBy }, { utils.standardDateFormat(statusUpdatedDate) }</ListGroupItem>
        { rooms.map(({ id, address, category: { name }, startDate, endDate }) =>
          <ListGroupItem key={id}>
            <Label>#{ address }</Label> { name }. {utils.fullDateFormat(startDate)} - {utils.fullDateFormat(endDate)}
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

export default ManageBookings;