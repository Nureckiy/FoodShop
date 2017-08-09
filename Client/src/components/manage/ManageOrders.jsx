import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';

import ManageTable from './ManageTable.jsx';
import * as utils from '../../utils/utils';

class ManageOrders extends Component {
  componentWillMount() {
    const { getOrders } = this.props;
    getOrders();
  }

  render() {
    const { activeRequestStatus, orders, changeOrderStatus, ordersInProcess } = this.props;
    const titles = ['Зарегистрирован', 'Завершен', 'Адрес', 'Пользователь', 'Телефон', 'Итого'];
    return (
      <ManageTable
        items={orders}
        titles={titles}
        onStatusChange={changeOrderStatus}
        getHeaderValues={this.getHeaderValues}
        renderBody={this.renderBody}
        activeRequestStatus={activeRequestStatus}
        processedItems={ordersInProcess}
      />
    );
  }

  getHeaderValues(order) {
    const { checkoutDate, completionDate, address, userName, surname, phone, total, takeAway } = order;
    return [ utils.fullDateFormat(checkoutDate), completionDate ? utils.fullDateFormat(completionDate) : 'не завершен',
      takeAway ? 'Без доставки' : address, userName + ' ' + surname , phone, `$${total}` ];
  }

  renderBody(order) {
    const { statusUpdatedBy, statusUpdatedDate, portions } = order;
    return (
      <ListGroup>
        <ListGroupItem>Последние изменения: { statusUpdatedBy }, { utils.standardDateFormat(statusUpdatedDate) }</ListGroupItem>
        { portions.map(({ id, parentName, count, size, weight }) =>
          <ListGroupItem key={id}>
            <Label>#{ parentName }</Label> { count } шт., { size }, { weight }
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

export default ManageOrders;
