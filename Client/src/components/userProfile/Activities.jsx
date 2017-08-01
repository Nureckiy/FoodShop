import React, { Component } from 'react';
import { Panel, Accordion, ListGroup, ListGroupItem } from 'react-bootstrap';

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
              <ListGroupItem header="Статус"> { messages.orderStatuses[order.status] }</ListGroupItem>
              <ListGroupItem header="Завершен"> { order.completionDate
                ? `Завершен ${utils.fullDateFormat(order.completionDate)}`
                : 'Нет'
              }
              </ListGroupItem>
              <ListGroupItem header="Доставка в номер"> { order.takeAway
                ? 'Без доставки'
                : `#${order.address}`
              }</ListGroupItem>
              <ListGroupItem header="Заказ">
                { order.portions && order.portions.map(portion =>
                  <p key={portion.id} className="paragraph">
                    {portion.parentName} ({ portion.size }, { portion.weight }) { portion.count } шт.
                  </p>
                )}
              </ListGroupItem>
              <ListGroupItem header="Имя">{ order.name } { order.surname }</ListGroupItem>
              <ListGroupItem header="Email">{ order.phone }</ListGroupItem>
              <ListGroupItem header="Итог">${ order.total }</ListGroupItem>
            </ListGroup>
          </Panel>
        )}
      </Accordion>
    );
  }
}

export default Activities;
