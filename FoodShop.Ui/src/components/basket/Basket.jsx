/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import TotalGoodItem from './TotalGoodItem.jsx';
import * as utils from '../../utils/utils';

class Basket extends Component {
  renderGoodItems() {
    const { model: { selectedGoods }, actions: { changeConfiguration } } = this.props;
    let selected = [];
    selectedGoods.map(good => {
       good.selected.map(item =>
        selected.push(<TotalGoodItem
          key={item.Id}
          title={good.Name}
          item={item}
          onChange={changeConfiguration}
        />)
       );
    });
    return selected;
  }
  render() {
    const { model: { selectedGoods }, actions: { clearSelected } } = this.props;
    const goodItems = this.renderGoodItems();
    const total = utils.calculateTotal(selectedGoods);
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg"
          className="cut row"
        />
        <div className="container basket-section">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <h2 className="cursive-font primary-color">Корзина</h2>
            </div>
          </div>
          <div className="row good-list">
            <form className="col-sm-12 col-xs-12">
              <ul >
                { goodItems }
                <li className="dotted">
                  <span className="col-sm-10 item">
                    <span>Итог</span><span className="sum">{total.toFixed(2)} $</span>
                  </span>
                </li>
              </ul>
              <div className="col-sm-12 buttons">
                <input type="button" value="Заказать" className="btn btn-warning"/>
                <input type="button" value="Очистить" className="btn btn-defult" onClick={clearSelected}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Basket;