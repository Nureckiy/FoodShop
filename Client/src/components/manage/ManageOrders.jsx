import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';

import ManageTable from './ManageTable.jsx';
import * as utils from '../../utils/utils';

class ManageOrders extends Component {
  constructor() {
    super();
    this.getHeaderValues = this.getHeaderValues.bind(this);
    this.renderBody = this.renderBody.bind(this);
  }

  componentDidMount() {
    const { getOrders } = this.props;
    getOrders();
  }

  render() {
    const { activeRequestStatus, orders, changeOrderStatus, ordersInProcess, translate } = this.props;
    const titles = [translate('registeredAt'), translate('completedAt'), translate('address'),
      translate('user'), translate('phone'), translate('total'), translate('status')];
    return (
      <ManageTable
        items={orders}
        titles={titles}
        onStatusChange={changeOrderStatus}
        getHeaderValues={this.getHeaderValues}
        renderBody={this.renderBody}
        activeRequestStatus={activeRequestStatus}
        processedItems={ordersInProcess}
        translate={translate} />
    );
  }

  getHeaderValues(order) {
    const { translate } = this.props;
    const { checkoutDate, completionDate, address, userName, surname, phone, total, takeAway } = order;
    return [ utils.fullDateFormat(checkoutDate), completionDate ? utils.fullDateFormat(completionDate) : translate('notCompleted'),
      takeAway ? translate('noDelivery') : address, userName + ' ' + surname , phone, `$${total}` ];
  }

  renderBody(order) {
    const { translate } = this.props;
    const { statusUpdatedBy, statusUpdatedDate, portions } = order;
    return (
      <ListGroup>
        <ListGroupItem>{translate('lastChanges')}: { statusUpdatedBy }, { utils.standardDateFormat(statusUpdatedDate) }</ListGroupItem>
        { portions.map(({ id, parentName, count, size, weight }) =>
          <ListGroupItem key={id}>
            <Label>#{ parentName }</Label> { count } {translate('pc')}, { size }, { weight }
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

export default ManageOrders;
