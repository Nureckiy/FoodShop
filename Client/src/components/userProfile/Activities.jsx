import React, { Component } from 'react';
import { Panel, Accordion, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Loc } from 'redux-react-i18n';

import messages from '!json!../../sources/appVariables.json';
import * as utils from '../../utils/utils';

class Activities extends Component {
  componentWillMount() {
    const { load } = this.props;
    load();
  }
  render() {
    const { orders } = this.props;
    return (
      <Accordion bsClass="full-headings-width panel-group">
        { orders && orders.map((order, index) =>
          <Panel
            key={index}
            eventKey={index}
            header={utils.fullDateFormat(order.checkoutDate)}>
            <ListGroup fill className="options-list">
              <ListGroupItem header={<Loc locKey="status" />}> { messages.orderStatuses[order.status] }</ListGroupItem>
              <ListGroupItem header={<Loc locKey="completed" />}> { order.completionDate
                ? <Loc locKey="completed" /> + utils.fullDateFormat(order.completionDate)
                : <Loc locKey="no" />
              }
              </ListGroupItem>
              <ListGroupItem header={<Loc locKey="roomDelivery" />}> { order.takeAway
                ? <Loc locKey="noDelivery" />
                : `#${order.address}`
              }</ListGroupItem>
              <ListGroupItem header={<Loc locKey="order" />}>
                { order.portions && order.portions.map(portion =>
                  <p key={portion.id} className="paragraph">
                    {portion.parentName} ({ portion.size }, { portion.weight }) <Loc locKey="orderCount" number={portion.count} />
                  </p>
                )}
              </ListGroupItem>
              <ListGroupItem header={<Loc locKey="name" />}>{ order.name } { order.surname }</ListGroupItem>
              <ListGroupItem header={<Loc locKey="email" />}>{ order.phone }</ListGroupItem>
              <ListGroupItem header={<Loc locKey="total" />}>${ order.total }</ListGroupItem>
            </ListGroup>
          </Panel>
        )}
      </Accordion>
    );
  }
}

export default Activities;
