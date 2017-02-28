/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

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
    const { order } = this.props;
    return (
      <li className="order-item">
        <Panel onClick={this.toggleHeader} className="order-item-head">{order.Date}</Panel>
        <Panel collapsible expanded={open}>
          {order.Configurations.map(item => (
            <ul key={item.Id}>
              <li>{item.Configuration.ParentGood.Name} (item.Configuration.Size) - {item.Count} шт.</li>
            </ul>
          ))}
        </Panel>
      </li>
    );
  }
}

export default OrderItem;