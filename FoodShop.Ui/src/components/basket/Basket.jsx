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
    const { selectedGoods } = this.props.model;
    const goodItems = this.renderGoodItems();
    const total = utils.calculateTotal(selectedGoods);
    return (
      <span>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg"
          className="cut"
        />
      <div className="gtco-section">
        <div className="gtco-container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center gtco-heading">
              <h2 className="cursive-font primary-color">Корзина</h2>
            </div>
          </div>
          <div className="row">
            <form className="col-sm-12 col-xs-12">
              <ul >
                { goodItems }
                <li className=" dotted">
                  <span className="col-sm-10 item">
                    <span className="sum">Итог</span><span>{total.toFixed(2)} $</span>
                  </span>
                </li>
              </ul>
              <div className="col-md-12 buttons">
                <input type="submit" value="Заказать" className="btn btn-warning"/>
                  <input type="submit" value="Очистить" className="btn btn-defult"/>
              </div>
            </form>
          </div>
        </div>
      </div>
      </span>
    );
  }
}

export default Basket;