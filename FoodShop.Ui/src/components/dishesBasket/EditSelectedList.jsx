import React, { Component } from 'react';
import TotalGoodItem from './TotalGoodItem.jsx';
import * as utils from '../../utils/utils';

class EditSelectedList extends Component {
  render() {
    const { selected, clearAll, onChange, onSubmit } = this.props;
    const total = utils.calculateTotal(selected);
    return (
      <div className="row good-list">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h2 className="cursive-font primary-color">Корзина</h2>
          </div>
        </div>
        <form className="col-sm-12 col-xs-12">
          <ul >
            {selected.map(good =>
              good.selected.map(item =>
                <TotalGoodItem
                  key={item.Id}
                  title={good.Name}
                  item={item}
                  onChange={onChange}
                />
              ))}
            <li className="dotted">
              <span className="col-sm-10 item">
              <span>Итог</span><span className="sum">{total.toFixed(2)} $</span>
              </span>
            </li>
          </ul>
          <div className="col-sm-12 buttons">
            <input type="button" value="Заказать" className="btn btn-warning" onClick={onSubmit}/>
            <input type="button" value="Очистить" className="btn btn-defult" onClick={clearAll}/>
          </div>
        </form>
      </div>
    );
  }
}

export default EditSelectedList;