import React from 'react';

const TotalGoodItem = props => {
  const { title, item: { size, number, price } } = props;
  const total = number * price;
  return (
    <li className="dotted">
      <span className="col-sm-10 item"><span>{title} ({size})</span><span className="sum">{total.toFixed(2)} $</span></span>
      <div className="col-sm-2 wrapper">
        <a className="btn-gray" onClick={increase}><span className="glyphicon glyphicon-plus"/></a>
        <input type="text" name="quantity" value={number} onChange={handleEnter}/>
        <a className="btn-gray" onClick={decrease}><span className="glyphicon glyphicon-minus"/></a>
        <a className="btn-gray" onClick={remove}><span className="glyphicon glyphicon-remove-circle"/></a>
      </div>
    </li>
  );

  function decrease() {
    changeValue(parseInt(props.item.number) - 1);
  }

  function increase() {
    changeValue(parseInt(props.item.number) + 1);
  }

  function handleEnter(event) {
    changeValue(event.target.value.replace(/[^\d]/g, ''));
  }

  function remove() {
    changeValue(0);
  }

  function changeValue(value) {
    const { onChange } = props;
    let { item } = props;
    item.number = value;
    onChange(item);
  }
};

export default TotalGoodItem;