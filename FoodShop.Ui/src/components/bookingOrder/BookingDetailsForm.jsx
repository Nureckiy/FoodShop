/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import { FormGroup, Alert, Button, Fade } from 'react-bootstrap';

import ControlledForm from '../common/ControlledForm.jsx';
import Field from '../common/Field.jsx';
import * as utils from '../../utils/utils';
import history from '../../store/History';

class BookingDetailsForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.state = { error: false };
  }

  hideAlert() {
    this.setState({ error: false });
  }

  handleSubmit(details) {
    const { book, selectedRooms } = this.props;
    if(selectedRooms.length) {
      book(Object.assign(
        { roomBookings: utils.parseRoomBooking(selectedRooms) },
        details,
      ));
      history.push('summary/booking');
    } else {
      this.setState({
        error: 'Выберите хотя-бы один номер'
      });
    }
  }

  getInitialValues() {
    const { user_metadata: { name, email, surname, patronymic, phone } } = utils.getProfile();
    return { name, email, surname, patronymic, phone };
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
            id="phone"
            type="text"
            label="Телефон"
            placeholder="Введите номер в формате: 80291234567"
            pattern="8[0-9]{10}"
            required
          />
        </FormGroup>
        <div className="col-sm-12 date-form">
          <button type="submit" className="btn btn-orange col-md-3 col-md-offset-5">Забронировать</button>
        </div>
        <div className="date-form col-sm-12">
          <Fade in={!!error}>
            <Alert bsStyle="danger">
              <button type="button" className="close" aria-label="Close" onClick={this.hideAlert}>
                <span aria-hidden="true">&times;</span>
              </button>
              <p>{ error }</p>
            </Alert>
          </Fade>
        </div>
      </ControlledForm>
    );
  }
}

export default BookingDetailsForm;
