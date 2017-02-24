/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import contactInfo from '!json!../../sources/contactInfo.json';
import { Form, FormGroup } from 'react-bootstrap';
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
      <div>
        <Header
          className="row"
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340139/fon3_dhhfll.jpg"
          title="Добро пожаловать!"
          subtitle="интернет&mdash;магазин вкусностей"
        />
        <div className="container contacts-form">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <h3>Пишите нам</h3>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup controlId={name}>
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
                      required
                    />
                    <FieldGroup
                      id="message"
                      componentClass="textarea"
                      placeholder="Введите сообщение"
                      label="Сообщение"
                      cols="30"
                      rows="10"
                      value={this.state.message}
                      onChange={this.handleInputChange}
                      required
                    />
                    <div className="form-group">
                      <input type="submit" value="Отправить" className="btn btn-primary"/>
                    </div>
                  </FormGroup>
                </Form>
              </div>
              <div className="col-md-5 col-md-push-1 animate-box">
                <div className="contact-info">
                  <h3>Контактная информация</h3>
                  <ul>
                    <li><span className="glyphicon glyphicon-map-marker"/>{contactInfo.address}</li>
                    <li><span className="glyphicon glyphicon-earphone"/><a href={`tel://${contactInfo.phone}`}>{contactInfo.phone}</a></li>
                    <li><span className="glyphicon glyphicon-envelope"/><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
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