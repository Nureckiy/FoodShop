import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import dateformat from 'dateformat';

class OrderItem extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.toggleHeader = this.toggleHeader.bind(this);
  }
  toggleHeader() {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  }
  render() {
    const { open } = this.state;
    const { order, order: { Configurations } } = this.props;
    return (
      <div className="order-summary">
        <li className="order-item">
          <Panel onClick={this.toggleHeader} className="order-item-head"><span className="price">{order.Total}$</span> {dateformat(order.Date, 'fullDate')}</Panel>
          <Panel collapsible expanded={open} className="noborder">
            <ul>
              <li><strong>Самовывоз:</strong> {order.TakeAway ? 'Да' : 'Нет'}</li>
              {!order.TakeAway && <li><strong>Адрес:</strong> {order.Address}</li>}
              <li><strong>Телефон:</strong> {order.phone}</li>
              <li><strong>Заказ:</strong></li>
              <li>
                {Configurations.map(item => (
                  <ul key={item.Id}>
                    <li>{item.Configuration.ParentGood.Name} ({item.Configuration.Size}) - {item.Count} шт.</li>
                  </ul>
                ))}
              </li>
            </ul>
          </Panel>
        </li>
      </div>
    );
  }
}

export default OrderItem;