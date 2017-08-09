import React, { Component } from 'react';
import { Loc } from 'redux-react-i18n';

class ViewProfile extends Component {
  render() {
    const { login, email, name, surname, patronymic, phone, address } = this.props;
    return (
      <div className="row">
        <div className="col-xs-2 text-center">
          <figure>
            <img src="http://res.cloudinary.com/dum4mjc9q/image/upload/v1463302387/gbkqeupmt3mb9kfuorgr.jpg" alt="user" className="img-circle img-responsive" />
          </figure>
        </div>
        <div className="col-xs-10">
          <ul>
            <li className=""><h2 style={{color: 'black'}}>{surname} {name} {patronymic}</h2></li>
            <li>
              <div className="col-sm-2"><p><Loc locKey="viewLogin" />:</p></div>
              <div className="col-sm-10"><p><strong>{login}</strong></p></div>
            </li>
            <li>
              <div className="col-sm-2"><p><Loc locKey="email" />:</p></div>
              <div className="col-sm-10"><p><strong>{email}</strong></p></div>
            </li>
            <li>
              <div className="col-sm-2"><p><Loc locKey="phone" />:</p></div>
              <div className="col-sm-10"><p><strong>{phone}</strong></p></div>
            </li>
            <li>
              <div className="col-sm-2"><p><Loc locKey="address" />:</p></div>
              <div className="col-sm-10"><p><strong>{address}</strong></p></div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}




export default ViewProfile;
