import React, { Component } from 'react';
import { Table, ListGroup, ListGroupItem, Label } from 'react-bootstrap';

import ExpandableTableBody from '../common/ExpandableTableBody.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import Select from '../common/Select.jsx';
import * as utils from '../../utils/utils';
import { orderStatuses } from '!json!../../sources/appVariables.json';

class ManageBookings extends Component {
  componentWillMount() {
    const { getBookings } = this.props;
    getBookings();
  }

  constructor() {
    super();
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  render() {
    const { activeRequestStatus, bookings } = this.props;
    return (
      <div className="container content">
        <div className="row">
          <Table hover responsive bsClass="manage-table table">
            <thead>
              <tr>
                <th>Зарегистрирован</th>
                <th>Пользователь</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Итого</th>
                <th>Статус</th>
                <th/>
              </tr>
            </thead>
            <ExpandableTableBody>
              { activeRequestStatus
                ? <ExpandableTableBody.Content collapsed><LoadingComponent showLoader/></ExpandableTableBody.Content>
                : bookings.map(booking => this.renderField(booking))
              }
            </ExpandableTableBody>
          </Table>
        </div>
      </div>
    );
  }

  renderField(booking) {
    const { bookingsInProcess } = this.props;
    const { id, registrationTime, name, email, phone, total, status, statusUpdatedBy, statusUpdatedDate, rooms } = booking;
    return [
      <ExpandableTableBody.Row eventKey={id} key={id}>
        <td>{ utils.fullDateFormat(registrationTime) }</td>
        <td>{ name }</td>
        <td>{ email }</td>
        <td>{ phone }</td>
        <td>${ total }</td>
        <td>
          <Select
            options={utils.renderObjectOptions(orderStatuses)}
            value={status}
            onChange={this.handleStatusChange(id)}
            onClick={e => e.stopPropagation()}
          />
        </td>
        <td><LoadingComponent small showLoader={bookingsInProcess.includes(id)} /></td>
      </ExpandableTableBody.Row>,
      <ExpandableTableBody.Content eventKey={id}>
        <ListGroup>
          <ListGroupItem>Последние изменения: { statusUpdatedBy }, { utils.standardDateFormat(statusUpdatedDate) }</ListGroupItem>
          { rooms.map(room =>
            <ListGroupItem key={room.id}>
              <Label>#{ room.address }</Label>
              { room.category.name }. {utils.fullDateFormat(room.startDate)} - {utils.fullDateFormat(room.endDate)}
            </ListGroupItem>
          )}
        </ListGroup>
      </ExpandableTableBody.Content>
    ];
  }

  handleStatusChange(id) {
    const { changeBookingStatus } = this.props;
    return event => changeBookingStatus(id, event.target.value);
  }
}

export default ManageBookings;