import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';

import ManageTable from './ManageTable.jsx';
import * as utils from '../../utils/utils';

class ManageBookings extends Component {
  constructor() {
    super();
    this.renderBody = this.renderBody.bind(this);
  }

  componentDidMount() {
    const { getBookings } = this.props;
    getBookings();
  }

  render() {
    const { bookings, activeRequestStatus, bookingsInProcess, changeBookingStatus, translate } = this.props;
    const titles = [translate('registeredAt'), translate('user'), translate('email'), translate('phone'), translate('total'), translate('status')];
    return (
      <ManageTable
        items={bookings}
        titles={titles}
        onStatusChange={changeBookingStatus}
        getHeaderValues={this.getHeaderValues}
        renderBody={this.renderBody}
        activeRequestStatus={activeRequestStatus}
        processedItems={bookingsInProcess}
        translate={translate} />
    );
  }

  getHeaderValues(booking) {
    const { registrationTime, name, email, phone, total } = booking;
    return [ utils.fullDateFormat(registrationTime), name, email, phone, `$${total}` ];
  }

  renderBody(booking) {
    const { translate } = this.props;
    const { statusUpdatedBy, statusUpdatedDate, rooms } = booking;
    return (
      <ListGroup>
        <ListGroupItem>{translate('lastChanges')}: { statusUpdatedBy }, { utils.standardDateFormat(statusUpdatedDate) }</ListGroupItem>
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