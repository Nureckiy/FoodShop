import React, { Component } from 'react';
import { Panel, Accordion, ListGroup, ListGroupItem, Label } from 'react-bootstrap';

import LoadingComponent from '../common/LoadingComponent.jsx';
import * as utils from '../../utils/utils';

class Activities extends Component {
  componentDidMount() {
    const { load } = this.props;
    load();
  }
  render() {
    const { orders, translate, loading } = this.props;
    return (
      <LoadingComponent showLoader={loading}>
       <Accordion bsClass="full-headings-width panel-group">
          { orders && orders.map((order) =>
            <Panel
              key={order.id}
              eventKey={order.id}
              header={utils.fullDateFormat(order.checkoutDate)}>
              <ListGroup fill className="options-list">
                <ListGroupItem header={translate('status')}> { translate(order.status) }</ListGroupItem>
                <ListGroupItem header={translate('completed')}> { order.completionDate
                  ? translate('completed') + utils.fullDateFormat(order.completionDate)
                  : translate('no')
                }
                </ListGroupItem>
                <ListGroupItem header={translate('roomDelivery')}> { order.takeAway
                  ? translate('noDelivery')
                  : `#${order.address}`
                }</ListGroupItem>
                <ListGroupItem header={translate('order')}>
                  { order.portions && order.portions.map(portion =>
                    <ListGroupItem key={portion.id} className="paragraph">
                      <Label>{portion.count} {translate('pc')}</Label> {portion.parentName} ({ portion.size } { portion.weight })
                    </ListGroupItem>
                  )}
                </ListGroupItem>
                <ListGroupItem header={translate('name')}>{ order.name } { order.surname }</ListGroupItem>
                <ListGroupItem header={translate('email')}>{ order.phone }</ListGroupItem>
                <ListGroupItem header={translate('total')}>${ order.total }</ListGroupItem>
              </ListGroup>
            </Panel>
          )}
        </Accordion>
      </LoadingComponent>
    );
  }
}

export default Activities;
