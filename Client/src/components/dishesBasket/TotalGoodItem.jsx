import React, { Component } from 'react';

class TotalGoodItem extends Component {
  render() {
    const { title, item: { size, number, price } } = this.props;
    const total = number * price;
    return (
      <li className="dotted">
        <span className="col-sm-10 item"><span>{title} ({size})</span><span className="sum">{total.toFixed(2)} $</span></span>
        <div className="col-sm-2 wrapper">
          <a className="btn-gray" onClick={this.increase.bind(this)}><span className="glyphicon glyphicon-plus"/></a>
          <input type="text" name="quantity" value={number} onChange={this.handleEnter.bind(this)}/>
          <a className="btn-gray" onClick={this.decrease.bind(this)}><span className="glyphicon glyphicon-minus"/></a>
          <a className="btn-gray" onClick={this.remove.bind(this)}><span className="glyphicon glyphicon-remove-circle"/></a>
        </div>
      </li>
    );
  }

  decrease() {
    this.changeValue(parseInt(this.props.item.number) - 1);
  }

  increase() {
    this.changeValue(parseInt(this.props.item.number) + 1);
  }

  handleEnter(event) {
    this.changeValue(event.target.value.replace(/[^\d]/g, ''));
  }

  remove() {
    this.changeValue(0);
  }

  changeValue(value) {
    const { onChange } = this.props;
    let { item } = this.props;
    item.number = value;
    onChange(item);
  }
}

export default TotalGoodItem;