/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import GoodList from './GoodList.jsx';
import mainCategories from '!json!../../sources/mainCategories.json';
import Loader from '../common/Loader.jsx';
import config from '../../config';

class Menu extends Component {
  componentWillMount() {
    const { category, actions: { getGoods, getPopularGoods } } = this.props;
    if (category) {
      getGoods(category, true);
    } else {
      getPopularGoods(config.popularGoodsCount);
    }
  }
  componentWillReceiveProps(props) {
    const { category, actions: { getGoods, getPopularGoods } } = this.props;
    const newCategory = props.category;
    if (category !== newCategory) {
      if (newCategory) {
        getGoods(newCategory, true);
      } else {
        getPopularGoods(config.popularGoodsCount);
      }
    }

  }
  render() {
    const { goods, activeRequestStatus, selectedGoods } = this.props.model;
    const { selectGoods } = this.props.actions;
    const { category } = this.props;
    const categoryName = category && mainCategories[category] ? mainCategories[category] : 'Популярные блюда';
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg"
          title={category ? '' : 'Оцените наше меню!'}
          subtitle={category ? '' : 'интернет-магазин вкусностей'}
          className={category ? 'cut' : ''}
        />
        <div className="container content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center title">
              <h2 className="cursive-font primary-color">{categoryName}</h2>
              <p>Приготовлением вкусностей занимаются профессиональные повара и используются только самые свежие продукты.</p>
            </div>
          </div>
          { activeRequestStatus
            ? <Loader />
            : <GoodList selected={selectedGoods} items={goods} onSelect={selectGoods} />
          }
        </div>
      </div>
    );
  }
}

export default Menu;