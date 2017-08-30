import React from 'react';
import { FormGroup, Button } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import Select from '../common/Select';
import languages from '../../sources/translations/translations';

const EditProfile = props => (
  <ControlledForm initialValues={props.initial} onSubmit={(values) => props.onSubmit({ user_metadata:  values })}>
    <h3 style={{color: 'black'}}>{props.translate('profileSettings')}</h3>
    <FormGroup className="col-md-6">
      <Select
        id="language"
        label={props.translate('language')}
        options={getLanguageOptions()}
      />
      <Field
        id="name"
        type="text"
        label={props.translate('name')}
        placeholder={props.translate('enterName')}
      />
      <Field
        id="surname"
        type="text"
        label={props.translate('surname')}
        placeholder={props.translate('enterSurname')}
      />
      <Field
        id="patronymic"
        type="text"
        label={props.translate('patronymic')}
        placeholder={props.translate('enterPatronymic')}
      />
    </FormGroup>
    <FormGroup className="col-md-6">
      <Field
        id="phone"
        type="text"
        label={props.translate('phone')}
        pattern="8[0-9]{10}"
        placeholder={<span>props.translate('enterPhoneInFormat" /> 80291234567</span>}
      />
      <Field
        id="email"
        type="email"
        label={props.translate('email')}
        placeholder={props.translate('enterEmail')}
      />
      <Field
        id="address"
        type="text"
        label={props.translate('address')}
        placeholder={props.translate('enterAddress')}
      />
    </FormGroup>
    <div className="col-md-12">
      <Button type="submit" className="btn btn-orange pull-left">{props.translate('save')}</Button>
    </div>
  </ControlledForm>
);

function getLanguageOptions() {
  return Object.keys(languages).map(key => {
    return { value: key, text: languages[key].name };
  });
}

export default EditProfile;