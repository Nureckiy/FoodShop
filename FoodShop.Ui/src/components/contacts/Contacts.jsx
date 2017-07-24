import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import { contactInfo } from '!json!../../sources/appVariables.json';
import Field from '../common/Field.jsx';
import * as utils from '../../utils/utils';
import { FormGroup } from 'react-bootstrap';

class Contacts extends Component {
  getInitialValues() {
    const { name, email } = utils.getProfile().user_metadata;
    return { userName: name, email };
  }
  render() {
    const { sendFeedback } = this.props.actions;
    const { address, phone, email } = contactInfo;
    const initial = this.getInitialValues();
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340139/fon3_dhhfll.jpg"
          title="Добро пожаловать!"
          subtitle="интернет&mdash;магазин вкусностей"
        />
        <div className="container content">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <h3>Пишите нам</h3>
                <ControlledForm initialValues={initial} onSubmit={sendFeedback}>
                  <FormGroup>
                    <Field
                      id="userName"
                      type="text"
                      placeholder="Представтесь"
                      label="Имя"
                    />
                    <Field
                      id="email"
                      type="email"
                      placeholder="Ваш e-mail"
                      label="E-mail"
                      required
                    />
                    <Field
                      id="message"
                      componentClass="textarea"
                      placeholder="Введите сообщение"
                      label="Сообщение"
                      cols="30"
                      rows="10"
                      required
                    />
                  </FormGroup>
                  <div className="form-group">
                    <input type="submit" value="Отправить" className="btn btn-orange"/>
                  </div>
                </ControlledForm>
              </div>
              <div className="col-md-5 col-md-push-1 animate-box">
                <div className="contact-info">
                  <h3>Контактная информация</h3>
                  <ul>
                    <li><span className="glyphicon glyphicon-map-marker"/>{address}</li>
                    <li><span className="glyphicon glyphicon-earphone"/><a href={`tel://${ phone }`}>{ phone }</a></li>
                    <li><span className="glyphicon glyphicon-envelope"/><a href={`mailto:${ email }`}>{ email }</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Contacts;