import React from 'react';

import Header from '../layout/Header.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import messages from '!json!../../sources/appVariables.json';

const OrderSummary = props => {
  const { app: { orderActiveRequestStatus }, translate } = props;
  const { message, imageUrl } = getContentInfo(props.params.orderType, props.app.isSuccessOrder);
  return (
    <div>
      <Header backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg" />
      <LoadingComponent showLoader={orderActiveRequestStatus}>
        <div className="container content text-center">
          <div className="col-md-8 col-md-offset-2">
            <h2 className="cursive-font primary-color">{translate('thankYou')}!</h2>
            <p>{ message }</p>
          </div>
          <img src={imageUrl} />
          <div className="row content">
            <a href="#" className="btn btn-warning">{translate('toMain')}</a>
          </div>
        </div>
      </LoadingComponent>
    </div>
  );

  function getContentInfo() {
    const { params: { orderType }, app: { isSuccessOrder }, translate } = props;
    let message, imageUrl;
    if (isSuccessOrder) {
      message = translate('success_' + orderType);
      imageUrl = messages.order[orderType].img;
    } else {
      message = translate('errorOccurred');
      imageUrl = messages.order.failImg;
    }
    return { message, imageUrl };
  }
};

export default OrderSummary;