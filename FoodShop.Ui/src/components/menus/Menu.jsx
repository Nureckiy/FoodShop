/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import GoodList from './GoodList.jsx';
import mainCategories from '!json!../../sources/mainCategories.json';
import Loader from '../common/Loader.jsx';

class Menu extends Component {
  componentWillMount() {
    const { category, actions: { getGoods, getPopularGoods } } = this.props;
    if (category) {
      getGoods(category, true);
    } else {
      getPopularGoods();
    }
  }
  componentWillReceiveProps(props) {
    const { category, actions: { getGoods, getPopularGoods } } = this.props;
    const newCategory = props.category;
    if (category !== newCategory) {
      if (category) {
        getGoods(newCategory, true);
      } else {
        getPopularGoods();
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
          title="Оцените наше меню!"
          subtitle="интернет&mdash;магазин вкусностей"
        />
        <div className="gtco-section">
          <div className="gtco-container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center gtco-heading">
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
      </div>
    );
  }
}

export default Menu;