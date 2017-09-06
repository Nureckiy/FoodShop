/*eslint no-unused-vars: "off"*/

import React, { Component } from 'react';
import { Panel, Accordion, ListGroup, ListGroupItem, Label } from 'react-bootstrap';

import LoadingComponent from '../common/LoadingComponent.jsx';
import { orderStatuses } from '!json!../../sources/appVariables.json';
import * as utils from '../../utils/utils';

class BookingsList extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    const { bookings, translate, loading } = this.props;
    const format = (date) => utils.standardDateFormat(date);
    return (
      <LoadingComponent showLoader={loading}>
      <Accordion bsClass="full-headings-width panel-group">
        { bookings && bookings.map((booking) =>
          <Panel
            key={booking.id}
            eventKey={booking.id}
            header={utils.fullDateFormat(booking.registrationTime)}>
            <ListGroup fill className="options-list">
              <ListGroupItem header={translate('status')}> { translate(booking.status) }</ListGroupItem>
              <ListGroupItem header={translate('order')}>
                <ListGroup className="paragraph">
                { booking.rooms && booking.rooms.map(room =>
                  <ListGroupItem key={room.id}>
                    <Label>#{ room.address }</Label> { room.category.name }. {format(room.startDate)} - {format(room.endDate)}
                  </ListGroupItem>
                )}
                </ListGroup>
              </ListGroupItem>
              <ListGroupItem header={translate('name')}>{ booking.name } { booking.surname } { booking.patronymic }</ListGroupItem>
              <ListGroupItem header={translate('email')}>{ booking.email }</ListGroupItem>
              <ListGroupItem header={translate('total')}>${ booking.total }</ListGroupItem>
            </ListGroup>
        </Panel>
        )}
      </Accordion>
    </LoadingComponent>
    );
  }
}

export default BookingsList;
