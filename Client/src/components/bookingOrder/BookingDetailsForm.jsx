import React, { Component } from 'react';
import { FormGroup, Alert, Fade, Button } from 'react-bootstrap';

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
    const { translate } = this.props;
    const initial = getInitialValues();
    return (
      <ControlledForm className="col-sm-12" initialValues={initial} onSubmit={this.handleSubmit}>
        <FormGroup bsClass="col-md-5">
          <Field
            id="name"
            type="text"
            label={translate('name')}
            placeholder={translate('enterName')}
            required
          />
          <Field
            id="surname"
            type="text"
            label={translate('surname')}
            placeholder={translate('enterSurname')}
            required
          />
          <Field
            id="patronymic"
            type="text"
            label={translate('patronymic')}
            placeholder={translate('enterPatronymic')}
            required
          />
        </FormGroup>
        <FormGroup bsClass="col-md-5 col-md-offset-2">
          <Field
            id="email"
            type="email"
            placeholder={translate('enterEmail')}
            label={translate('email')}
            required
          />
          <Field
            id="phone"
            type="text"
            label={translate('phone')}
            placeholder={translate('enterPhoneInFormat')}
            pattern="8[0-9]{10}"
            required
          />
        </FormGroup>
        <div className="col-sm-12 date-form">
          <Button type="submit" bsStyle="primary col-md-4 col-md-offset-4 col-xs-12">{translate('bookIt')}</Button>
        </div>
        <div className="date-form col-sm-12">
          <Fade in={!!error}>
            <Alert bsStyle="danger">
              <Button type="button" bsStyle="primary icon" aria-label="close" onClick={this.hideErrorMsg}>
                <span aria-hidden="true">&times;</span>
              </Button>
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
    const { book, selectedRooms, translate } = this.props;
    if(selectedRooms.length) {
      book({ roomBookings: utils.parseRoomBooking(selectedRooms), ...details });
      history.push('summary/booking');
    } else {
      this.showErrorMsg(translate('noRoomsSelected'));
    }
  }
}

function getInitialValues() {
  const { name, email, surname, patronymic, phone } = utils.getProfile().user_metadata;
  return { name, email, surname, patronymic, phone };
}

export default BookingDetailsForm;
