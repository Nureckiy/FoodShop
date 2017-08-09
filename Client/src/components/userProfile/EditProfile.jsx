import React, { Component } from 'react';
import { Loc } from 'redux-react-i18n';

import { FormGroup } from 'react-bootstrap';
import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import Select from '../common/Select';
import languages from '!json!../../localization/languages.json';

class EditProfile extends Component {
  render() {
    const languageOptions = languages.map(language => {
      return { value: language.code, text: language.name };
    });
    const { initial } = this.props;
    return (
      <ControlledForm initialValues={initial} onSubmit={this.handleSubmit.bind(this)}>
        <h3 style={{color: 'black'}}><Loc locKey="profileSettings" className="black" /></h3>
        <FormGroup className="col-md-6">
          <Select
            id="language"
            label={<Loc locKey="language" />}
            options={languageOptions}
          />
          <Field
            id="name"
            type="text"
            label={<Loc locKey="name" />}
            placeholder={<Loc locKey="enterName" />}
          />
          <Field
            id="surname"
            type="text"
            label={<Loc locKey="surname" />}
            placeholder={<Loc locKey="enterSurname" />}
          />
          <Field
            id="patronymic"
            type="text"
            label={<Loc locKey="patronymic" />}
            placeholder={<Loc locKey="enterPatronymic" />}
          />
        </FormGroup>
        <FormGroup className="col-md-6">
          <Field
            id="phone"
            type="text"
            label={<Loc locKey="phone" />}
            pattern="8[0-9]{10}"
            placeholder={<span><Loc locKey="enterPhoneInFormat" /> 80291234567</span>}
          />
          <Field
            id="email"
            type="email"
            label={<Loc locKey="email" />}
            placeholder={<Loc locKey="enterEmail" />}
          />
          <Field
            id="address"
            type="text"
            label={<Loc locKey="address" />}
            placeholder={<Loc locKey="enterAddress" />}
          />
        </FormGroup>
        <div className="col-md-12">
          <button type="submit" className="btn btn-orange pull-left">{<Loc locKey="save" />}</button>
        </div>
      </ControlledForm>
    );
  }

  handleSubmit(values) {
    const { onSubmit } = this.props;
    onSubmit({ user_metadata:  values });
  }
}

export default EditProfile;