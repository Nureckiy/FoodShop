import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';

class CreateRoomCategoryForm extends Component {
  render() {
    const { onSubmit, formId, initial } = this.props;
    return (
      <ControlledForm onSubmit={ onSubmit } id={ formId } initialValues={initial} >
        <FormGroup>
          <Field
            id="name"
            type="text"
            label="Название"
            required
          />
          <Field
            id="guestsNumber"
            type="number"
            label="Количество гостей"
            required
          />
          <Field
            id="description"
            type="text"
            label="Описание"
          />
          <Field
            id="coverUrl"
            type="text"
            label="Ссылка на изображение"
          />
        </FormGroup>
      </ControlledForm>
    );
  }
}

export default CreateRoomCategoryForm;