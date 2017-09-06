import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';

import ManageTable from './ManageTable.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import * as utils from '../../utils/utils';
import config from '../../config';

class ManageOrders extends Component {
  constructor() {
    super();
    this.getHeaderValues = this.getHeaderValues.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    const { getOrders } = this.props;
    getOrders(1, config.orderItemsCount);
  }

  render() {
    const { activeRequestStatus, orders, changeOrderStatus, ordersTotal, currentOrdersPage, translate } = this.props;
    const titles = [translate('registeredAt'), translate('completedAt'), translate('address'),
      translate('user'), translate('phone'), translate('total'), translate('status')];
    return (
      <ManageTable
        items={orders}
        totalPagesCount={Math.ceil(ordersTotal / config.orderItemsCount)}
        onPageChange={this.handlePageChange}
        activePage={currentOrdersPage}
        titles={titles}
        onStatusChange={changeOrderStatus}
        getHeaderValues={this.getHeaderValues}
        renderBody={this.renderBody}
        activeRequestStatus={activeRequestStatus}
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
    const { translate, activeRequestStatus } = this.props;
    const { statusUpdatedBy, statusUpdatedDate, portions } = order;
    return (
      <LoadingComponent showLoader={activeRequestStatus}>
        <ListGroup>
          <ListGroupItem>{translate('lastChanges')}: { statusUpdatedBy }, { utils.standardDateFormat(statusUpdatedDate) }</ListGroupItem>
          { portions.map(({ id, parentName, count, size, weight }) =>
            <ListGroupItem key={id}>
              <Label>#{ parentName }</Label> { count } {translate('pc')}, { size }, { weight }
            </ListGroupItem>
          )}
        </ListGroup>
      </LoadingComponent>
    );
  }

  handlePageChange(pageNumber) {
    const { getOrders } = this.props;
    getOrders(pageNumber, config.orderItemsCount);
  }
}

export default ManageOrders;
