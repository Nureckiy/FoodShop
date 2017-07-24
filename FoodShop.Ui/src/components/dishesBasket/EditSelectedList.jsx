import React, { Component } from 'react';
import TotalGoodItem from './TotalGoodItem.jsx';
import * as utils from '../../utils/utils';

class EditSelectedList extends Component {
  render() {
    const { selected, clearAll, onChange, onSubmit } = this.props;
    const total = utils.calculateDishTotal(selected);
    return (
      <div className="row good-list">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h2 className="cursive-font primary-color">Корзина</h2>
          </div>
        </div>
        <form className="col-sm-12 col-xs-12" onSubmit={onSubmit}>
          <ul>
            {selected.map(good =>
              good.selected.map(item =>
                <TotalGoodItem
                  key={item.id}
                  title={good.name}
                  item={item}
                  onChange={onChange}
                />
              ))}
            <li className="dotted">
              <span className="col-sm-10 item">
              <span className="primary-color">Итог</span><span className="sum">{total.toFixed(2)} $</span>
              </span>
            </li>
          </ul>
          <div className="col-sm-12 buttons text-center top-indent">
            <button className="btn btn-orange">Заказать</button>
            <button type="button" className="btn btn-defult" onClick={clearAll}>Очистить</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditSelectedList;
