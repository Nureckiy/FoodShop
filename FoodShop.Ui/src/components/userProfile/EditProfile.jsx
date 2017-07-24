/*eslint no-unused-vars: "off"*/

import React, { Component } from 'react';

import { FormGroup } from 'react-bootstrap';
import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
class EditProfile extends Component {
  handleSubmit(values) {
    const { initial: { id }, onSubmit } = this.props;
    onSubmit(id, {user_metadata:  values });
  }
  render() {
    const { initial } = this.props;
    return (
      <ControlledForm initialValues={initial} onSubmit={this.handleSubmit.bind(this)}>
        <h3 style={{color: 'black'}} className="black">Настройки профиля</h3>
        <FormGroup className="col-md-6">
          <Field
            id="name"
            type="text"
            label="Имя"
            placeholder="Введите имя"
          />
          <Field
            id="surname"
            type="text"
            label="Фамилия"
            placeholder="Введите фамилию"
          />
          <Field
            id="patronymic"
            type="text"
            label="Отчество"
            placeholder="Введите отчество"
          />
        </FormGroup>
        <FormGroup className="col-md-6">
          <Field
            id="phone"
            type="text"
            label="Номер телефона"
            pattern="8[0-9]{10}"
            placeholder="Введите номер в формате: 80291234567"
          />
          <Field
            id="email"
            type="email"
            label="Email"
            placeholder="Введите email"
          />
          <Field
            id="address"
            type="text"
            label="Адрес"
            placeholder="Введите ваш адрес"
          />
        </FormGroup>
        <div className="col-md-12">
          <button type="submit" className="btn btn-orange pull-left">Сохранить</button>
        </div>
      </ControlledForm>
    );
  }
}

export default EditProfile;