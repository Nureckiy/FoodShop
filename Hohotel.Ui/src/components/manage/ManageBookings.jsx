import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';

import ManageTable from './ManageTable.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import * as utils from '../../utils/utils';
import config from '../../config';

class ManageBookings extends Component {
  constructor() {
    super();
    this.state = ({ page: 1 });
    this.renderBody = this.renderBody.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    const { getBookings } = this.props;
    getBookings(1, config.bookingItemsCount);
  }

  render() {
    const { bookings, activeRequestStatus, changeBookingStatus, bookingsTotal, currentBookingsPage, translate } = this.props;
    const titles = [translate('registeredAt'), translate('user'), translate('email'), translate('phone'), translate('total'), translate('status')];
    return (
      <ManageTable
        items={bookings}
        totalPagesCount={Math.ceil(bookingsTotal / config.bookingItemsCount)}
        onPageChange={this.handlePageChange}
        activePage={currentBookingsPage}
        titles={titles}
        onStatusChange={changeBookingStatus}
        getHeaderValues={this.getHeaderValues}
        renderBody={this.renderBody}
        activeRequestStatus={activeRequestStatus}
        translate={translate} />
    );
  }

  getHeaderValues(booking) {
    const { registrationTime, name, email, phone, total } = booking;
    return [ utils.fullDateFormat(registrationTime), name, email, phone, `$${total}` ];
  }

  renderBody(booking) {
    const { translate, activeRequestStatus } = this.props;
    const { statusUpdatedBy, statusUpdatedDate, rooms } = booking;
    return (
      <LoadingComponent showLoader={activeRequestStatus}>
        <ListGroup>
          <ListGroupItem>{translate('lastChanges')}: { statusUpdatedBy }, { utils.standardDateFormat(statusUpdatedDate) }</ListGroupItem>
          { rooms.map(({ id, address, category: { name }, startDate, endDate }) =>
            <ListGroupItem key={id}>
              <Label>#{ address }</Label> { name }. {utils.fullDateFormat(startDate)} - {utils.fullDateFormat(endDate)}
            </ListGroupItem>
          )}
        </ListGroup>
      </LoadingComponent>
    );
  }

  handlePageChange(pageNumber) {
    const { getBookings } = this.props;
    getBookings(pageNumber, config.orderItemsCount);
  }
}

export default ManageBookings;