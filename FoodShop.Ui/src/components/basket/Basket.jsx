/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import EditSelectedList from './EditSelectedList.jsx';
import DeliveryDetailsForm from './DeliveryDetailsForm.jsx';
import OrserSummary from './OrderSummary.jsx';

class Basket extends Component {
  constructor() {
    super();
    this.state = {
      step: 0
    };
    this.goToNext = this.goToNext.bind(this);
    this.goBack = this.goBack.bind(this);
    this.addOrder = this.addOrder.bind(this);
  }
  goToNext() {
    let { step } = this.state;
    step++;
    this.setState({ step });
  }
  goBack() {
    let { step } = this.state;
    step--;
    this.setState({ step });
  }
  addOrder(details) {
    const { addOrder, selectedGoods, clearSelected } = this.props;
    addOrder(selectedGoods, details, () => {
      this.goToNext();
      clearSelected();
    });
  }
  renderChild() {
    const { auth, selectedGoods, clearSelected, changeConfiguration } = this.props;
    const { step } = this.state;
    if (!selectedGoods.length) {
      return 'Корзина пуста';
    }
    switch(step) {
      case 0:
        return (
          <EditSelectedList
            selected={selectedGoods}
            onChange={changeConfiguration}
            clearAll={clearSelected}
            onSubmit={this.goToNext}
          />
        );
      case 1:
        return(
          <DeliveryDetailsForm
            auth={auth}
            onSubmit={this.addOrder}
            onBack={this.goBack}
          />
        );
      case 2:
        return (
          <OrserSummary />
        );
    }
  }
  render() {
    const child = this.renderChild();
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg"
          className="cut row"
        />
        <div className="container basket-section">
          { child }
        </div>
      </div>
    );
  }
}

export default Basket;