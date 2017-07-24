/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import Loader from '../common/Loader.jsx';
import messages from '!json!../../sources/appVariables.json';

class OrderSummary extends Component {
  renderContent() {
    const { params: { orderType }, app: { isSuccessOrder } } = this.props;
    let message, imageUrl;

    if (isSuccessOrder) {
      message = messages.order[orderType].message;
      imageUrl = messages.order[orderType].img;
    } else {
      message = messages.order.fail;
      imageUrl = messages.order.img;
    }
   return { message, imageUrl };
  }
  render() {
    const { orderActiveRequestStatus } = this.props.app;
    const { message, imageUrl } = this.renderContent();
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg"
          className="cut"
        />
        { orderActiveRequestStatus ? <Loader /> :
          <div className="container content text-center">
            <div className="col-md-8 col-md-offset-2">
              <h2 className="cursive-font primary-color">Спасибо!</h2>
              <p>{ message }</p>
            </div>
            <img src={imageUrl} />
            <div className="row content">
              <a href="#" className="btn btn-warning">На главную</a>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default OrderSummary;