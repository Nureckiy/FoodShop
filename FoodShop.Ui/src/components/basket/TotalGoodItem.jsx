/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

class TotalGoodItem extends Component {
  constructor(props) {
    super(props);
    this.decrease = this.decrease.bind(this);
    this.increase = this.increase.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.remove = this.remove.bind(this);
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
  render() {
    const { title, item: { Size, number, Price } } = this.props;
    const total = number * Price;
    return (
      <li className="dotted">
        <span className="col-sm-10 item"><span>{title} ({Size})</span><span className="sum">{total.toFixed(2)} $</span></span>
        <div className="col-sm-2 wrapper">
          <a className="btn-gray" onClick={this.increase}><span className="glyphicon glyphicon-plus"/></a>
          <input type="text" name="quantity" value={number} onChange={this.handleEnter}/>
          <a className="btn-gray" onClick={this.decrease}><span className="glyphicon glyphicon-minus"/></a>
          <a className="btn-gray" onClick={this.remove}><span className="glyphicon glyphicon-remove-circle"/></a>
        </div>
      </li>
    );
  }
}

export default TotalGoodItem;