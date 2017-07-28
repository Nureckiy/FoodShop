/*eslint no-unused-vars: "off"*/

import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import GoodList from './GoodList.jsx';
import { mainCategories } from '!json!../../sources/appVariables.json';
import AddTile from '../admin/AddTile.jsx';
import DishControlForm from '../admin/DishControlForm.jsx';
import Loader from '../common/Loader.jsx';
import config from '../../config';
import ControlledModal from '../common/ControlledModal.jsx';

class Menu extends Component {
  componentWillMount() {
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
    const { category, auth } = this.props;
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
          <div className="col-md-8 col-md-offset-2 text-center title">
            <h2 className="cursive-font primary-color">{categoryName}</h2>
            <p>Приготовлением вкусностей занимаются профессиональные повара и используются только самые свежие
              продукты.</p>
            <a href="#/basket/" className="btn-tra">
              Корзина <i id="basket-icon" className="glyphicon glyphicon-shopping-cart"/>
            </a>
          </div>
          <ControlledModal ref="addDishModal" title="Добавить новое блюдо" onSubmit={() => this.refs.addDishModal.toggle()}>
            <DishControlForm onSubmit={createDish} formId="createDishForm" defaultCategory={category}/>
          </ControlledModal>
          { auth.isAdmin() &&
            <AddTile onClick={() => this.refs.addDishModal.toggle()} />
          }
          { activeRequestStatus
            ? <Loader />
            : <GoodList
                selected={selectedDishes}
                items={dishes}
                onSelect={selectDish}
                editDish={editDish}
                auth={auth}
                removeDish={removeDish}/>
          }
        </div>
      </div>
    );
  }
}

export default Menu;
