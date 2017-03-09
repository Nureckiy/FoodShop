/*eslint no-unused-vars: "off"*/

import React, { Component } from 'react';

import { FormGroup } from 'react-bootstrap';
import FieldGroup from '../common/FieldGroup.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import * as utils from '../../utils/utils';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getDefaults() {
    const phoneNumber = utils.getProfileItemFromMetadata('phoneNumber');
    const address = utils.getProfileItemFromMetadata('address');
    return { phoneNumber, address  };
  }
  handleSubmit(values) {
    const { onCancel, auth: { updateProfile, getProfile } } = this.props;
    const profile = getProfile();
    updateProfile(profile.user_id, { user_metadata: values }, onCancel);
  }
  render() {
    const { onCancel } = this.props;
    const initial = this.getDefaults();
    return (
      <div className="well profile col-sm-12">
        <h3>Настройки профиля</h3>
        <ControlledForm onSubmit={this.handleSubmit} initialValues={initial}>
          <FormGroup>
            <FieldGroup
              id="phoneNumber"
              type="text"
              label="Телефон"
              placeholder="Введите номер в формате: 80291234567"
            />
            <FieldGroup
              type="text"
              id="address"
              label="Адрес"
              placeholder="Ваш адрес"
            />
          </FormGroup>
          <div className="form-group buttons">
            <button type="submit" className="btn btn-warning">Сохранить</button>
            <button className="btn btn-defult" onClick={onCancel}>Отмена</button>
          </div>
        </ControlledForm>
      </div>
    );
  }
}

export default EditProfile;