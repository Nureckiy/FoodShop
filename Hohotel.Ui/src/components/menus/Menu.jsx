import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import DishesList from './DishesList.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import config from '../../config';

class Menu extends Component {
  componentDidMount() {
    this.uploadDishes(this.props.category);
  }
  componentWillUpdate(nextProps) {
    const { category } = this.props;
    if (category !== nextProps.category) {
      this.uploadDishes(nextProps.category);
    }
  }
  uploadDishes(category) {
    const { getDishes, getPopularDishes } = this.props.actions;
    if (category) {
      getDishes(category);
    } else {
      getPopularDishes(config.popularGoodsCount);
    }
  }
  render() {
    const { dishes, activeRequestStatus, selectedDishes } = this.props.model;
    const { selectDish, createDish, editDish, removeDish } = this.props.actions;
    const { category, profile, translate } = this.props;
    const categoryName = category ? translate(category): translate('popularDishes');
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg"
          big={!category}
          title={translate('titleMenu')}
          subtitle={translate('subtitleMenu')}
        />
        <div className="container content">
          <div className="col-md-8 col-md-offset-2 text-center title">
            <h2 className="cursive-font primary-color">{categoryName}</h2>
            <p>{translate('dishesListTitle')}</p>
            <a href="#/basket/" className="btn-tra">
              {translate('basket')} <i id="basket-icon" className="glyphicon glyphicon-shopping-cart"/>
            </a>
          </div>
          <LoadingComponent showLoader={activeRequestStatus}>
            <DishesList
              selected={selectedDishes}
              items={dishes}
              onCreate={createDish}
              onSelect={selectDish}
              editDish={editDish}
              profile={profile}
              defaultCategory={category}
              removeDish={removeDish}
              translate={translate}/>
          </LoadingComponent>
        </div>
      </div>
    );
  }
}

export default Menu;