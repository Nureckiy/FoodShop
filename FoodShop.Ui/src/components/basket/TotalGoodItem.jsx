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
        <span className="col-sm-10 item"><span>{title} ({Size})</span><span>{total.toFixed(2)} $</span></span>
        <div className="wrapper">
          <a className="plus button gray" onClick={this.increase}><span className="fa fa-plus"/></a>
          <input type="text" name="quantity" value={number} onChange={this.handleEnter}/>
          <a className="plus button gray" onClick={this.decrease}><span className="fa fa-minus"/></a>
          <a className="remove button gray" onClick={this.remove}><span className="fa fa-times-circle-o"/></a>
        </div>
      </li>

    );
  }
}

export default TotalGoodItem;