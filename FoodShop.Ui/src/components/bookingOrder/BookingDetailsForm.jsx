/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import { FormGroup, Alert, Button } from 'react-bootstrap';

import ControlledForm from '../common/ControlledForm.jsx';
import Field from '../common/Field.jsx';
import * as utils from '../../utils/utils';
import history from '../../store/History';

class BookingDetailsForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }
  hideAlert() {
    this.setState({ error: false });
  }
  handleSubmit(details) {
    const { book, selectedRooms } = this.props;
    const that = this;
    book(Object.assign(
      { rooms: utils.parseRoomBooking(selectedRooms) },
      details,
    ))
      .success(() => history.push('/bookingSuccess'))
      .fail(() => that.setState({ error: true }));
  }
  getInitialValues() {
    const { name, surname, patronymic, email, phoneNumber } = utils.getProfile();
    return { name, surname, patronymic, email, phoneNumber };
  }
  render() {
    const { error } = this.state;
    const initial = this.getInitialValues();
    return (
      <ControlledForm className="col-sm-12" initialValues={initial} onSubmit={this.handleSubmit}>
        <FormGroup bsClass="col-md-5">
          <Field
            id="name"
            type="text"
            label="Имя"
            placeholder="Ваше имя"
            required
          />
          <Field
            id="surname"
            type="text"
            label="Фамилия"
            placeholder="Ваша фамилия"
            required
          />
          <Field
            id="patronymic"
            type="text"
            label="Отчество"
            placeholder="Ваше отчество"
            required
          />
        </FormGroup>
        <FormGroup bsClass="col-md-5 col-md-offset-2">
          <Field
            id="email"
            type="email"
            placeholder="Ваш e-mail"
            label="Email"
            required
          />
          <Field
            id="phoneNumber"
            type="text"
            label="Телефон"
            placeholder="Введите номер в формате: 80291234567"
            pattern="8[0-9]{10}"
            required
          />
        </FormGroup>
        <div className="col-sm-12 date-form">
          <button type="submit" className="btn btn-primary col-md-3 col-md-offset-5">Забронировать</button>
        </div>
        <div className="date-form col-sm-12">
          {error &&
          <Alert bsStyle="danger">
            <p>При отправке запроса произошла ошибка, попробуйте повторить попытку позже</p>
            <Button type="button" onClick={this.hideAlert}>Скрыть</Button>
          </Alert>
          }
        </div>
      </ControlledForm>
    );
  }
}

export default BookingDetailsForm;