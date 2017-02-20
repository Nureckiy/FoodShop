import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import contactInfo from '!json!../../sources/contactInfo.json';
import { Form } from 'react-bootstrap';
import FieldGroup from '../common/FieldGroup.jsx';
import * as utils from '../../utils/utils';

class Contacts extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.fillDefault();
  }
  fillDefault() {
    const name = utils.getProfileItem('name');
    const email = utils.getProfileItem('email');
    this.setState({ name, email });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;
    this.setState({
      [name]: value
    });
  }
  handleSubmit() {
    const { sendFeedback } = this.props.actions;
    sendFeedback(this.state);
  }
  render() {
    return (
      <span>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340139/fon3_dhhfll.jpg"
          title="Добро пожаловать!"
          subtitle="интернет&mdash;магазин вкусностей"
        />
        <div className="gtco-section">
          <div className="gtco-container">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6 animate-box">
                  <h3>Пишите нам</h3>
                  <Form onSubmit={this.handleSubmit}>
                    <FieldGroup
                      id="name"
                      type="text"
                      placeholder="Представтесь"
                      label="Имя"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                    />
                    <FieldGroup
                      id="email"
                      type="email"
                      placeholder="Ваш e-mail"
                      label="E-mail"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                    <FieldGroup
                      id="message"
                      componentClass="textarea"
                      placeholder="Введите сообщение"
                      cols="30"
                      rows="10"
                      value={this.state.message}
                      onChange={this.handleInputChange}
                    />
                    <div className="form-group">
                      <input type="submit" value="Отправить" className="btn btn-primary"/>
                    </div>
                  </Form>
                </div>
                <div className="col-md-5 col-md-push-1 animate-box">
                  <div className="gtco-contact-info">
                    <h3>Контактная информация</h3>
                    <ul>
                      <li className="address">{contactInfo.address}</li>
                      <li className="phone"><a href={`tel://${contactInfo.phone}`}>{contactInfo.phone}</a></li>
                      <li className="email"><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
    );
  }
}


export default Contacts;