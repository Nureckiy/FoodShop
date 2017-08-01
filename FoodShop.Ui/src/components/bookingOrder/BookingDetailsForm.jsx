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
    this.hideErrorMsg = this.hideErrorMsg.bind(this);
    this.state = { error: false };
  }

  render() {
    const { error } = this.state;
    const initial = getInitialValues();
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
              <button type="button" className="close" aria-label="Close" onClick={this.hideErrorMsg}>
                <span aria-hidden="true">&times;</span>
              </button>
              <p>{ error }</p>
            </Alert>
          </Fade>
        </div>
      </ControlledForm>
    );
  }

  hideErrorMsg() {
    this.setState({ error: false });
  }

  showErrorMsg(error) {
    this.setState({ error });
  }

  handleSubmit(details) {
    const { book, selectedRooms } = this.props;
    if(selectedRooms.length) {
      book({ roomBookings: utils.parseRoomBooking(selectedRooms), ...details });
      history.push('summary/booking');
    } else {
      this.showErrorMsg('Выберите хотя-бы один номер');
    }
  }
}

function getInitialValues() {
  const { name, email, surname, patronymic, phone } = utils.getProfile().user_metadata;
  return { name, email, surname, patronymic, phone };
}

export default BookingDetailsForm;
