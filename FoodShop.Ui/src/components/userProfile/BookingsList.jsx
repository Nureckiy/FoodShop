/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import { Panel, Accordion, ListGroup, ListGroupItem } from 'react-bootstrap';
import dateformat from 'dateformat';

import messages from '!json!../../sources/appVariables.json';

class BookingsList extends Component {
  componentWillMount() {
    this.props.load();
  }
  renderDate({ startDate, endDate }) {
    const format = (date) => dateformat(date, 'dd mmmm');
    return `${format(startDate)} - ${format(endDate)}`;
  }
  render() {
    const { bookings } = this.props;
    return (
    <Accordion bsClass="full-headings-width panel-group" defaultActiveKey="1">
      { bookings.map((booking, index) =>
        <Panel
          header={dateformat(booking.registrationTime, 'dd mmmm yyyy')}
          key={index}
          eventKey={index}>
          <ListGroup fill className="options-list">
            <ListGroupItem header="Статус"> { messages.orderStatuses[booking.status] }</ListGroupItem>
            <ListGroupItem header="Заказ">
            { booking.rooms.map((room, index) =>
              <ListGroup className="paragraph">
                <ListGroupItem>{this.renderDate(room)}</ListGroupItem>
                <ListGroupItem>#{ room.address } ({ room.category.name })</ListGroupItem>
              </ListGroup>
            )}
            </ListGroupItem>
            <ListGroupItem header="Имя">{ booking.name } { booking.surname } { booking.patronymic }</ListGroupItem>
            <ListGroupItem header="Email">{ booking.email }</ListGroupItem>
            <ListGroupItem header="Итог">${ booking.total }</ListGroupItem>
          </ListGroup>
        </Panel>
      )}
    </Accordion>
    );
  }
}

export default BookingsList;
