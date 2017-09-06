import React from 'react';

const ViewProfile = props => (
  <div className="row">
    <div className="col-xs-2 text-center">
      <figure>
        <img src="http://res.cloudinary.com/dum4mjc9q/image/upload/v1463302387/gbkqeupmt3mb9kfuorgr.jpg" alt="user" className="img-circle img-responsive" />
      </figure>
    </div>
    <div className="col-xs-10">
      <ul>
        <li className=""><h2 style={{color: 'black'}}>{props.surname} {props.name} {props.patronymic}</h2></li>
        <li>
          <div className="col-sm-2"><p>{props.translate('viewLogin')}:</p></div>
          <div className="col-sm-10"><p><strong>{props.login}</strong></p></div>
        </li>
        <li>
          <div className="col-sm-2"><p>{props.translate('email')}:</p></div>
          <div className="col-sm-10"><p><strong>{props.email}</strong></p></div>
        </li>
        <li>
          <div className="col-sm-2"><p>{props.translate('phone')}:</p></div>
          <div className="col-sm-10"><p><strong>{props.phone}</strong></p></div>
        </li>
        <li>
          <div className="col-sm-2"><p>{props.translate('address')}:</p></div>
          <div className="col-sm-10"><p><strong>{props.address}</strong></p></div>
        </li>
      </ul>
    </div>
  </div>
);

export default ViewProfile;
