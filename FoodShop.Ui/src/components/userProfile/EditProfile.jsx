import React, { Component } from 'react';

import { Form, FormGroup } from 'react-bootstrap';
import FieldGroup from '../common/FieldGroup.jsx';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaults(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getDefaults(props) {
    const { user_metadata: { phone, address } } = props.auth.getProfile();
    return { phone, address  };
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
    const { onCancel, auth: { updateProfile, getProfile } } = this.props;
    const profile = getProfile();
    updateProfile(profile.user_id, { user_metadata: this.state }, onCancel);
  }
  render() {
    const { onCancel } = this.props;
    return (
      <div className="well profile col-sm-12">
        <h3>Настройки профиля</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FieldGroup
              id="phone"
              type="text"
              label="Телефон"
              placeholder="Введите номер в формате: 80291234567"
              value={this.state.phone}
              onChange={this.handleInputChange}
            />
            <FieldGroup
              type="text"
              id="address"
              label="Адрес"
              placeholder="Ваш адрес"
              value={this.state.address}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <div className="form-group">
            <button type="submit" className="btn btn-warning">Сохранить</button>
            <button className="btn btn-defult" onClick={onCancel}>Отмена</button>
          </div>
        </Form>
      </div>
    );
  }
}

export default EditProfile;