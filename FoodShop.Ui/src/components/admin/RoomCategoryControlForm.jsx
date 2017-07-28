import React, { Component } from 'react';
import { FormGroup, Button } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';

class RoomCategoryControlForm extends Component {
  render() {
    const { onSubmit, formId, initial, onRemove } = this.props;
    return (
      <ControlledForm onSubmit={ onSubmit } id={ formId } initialValues={initial} >
        { onRemove && <Button bsStyle="danger" onClick={() => onRemove(initial.id)}>Удалить</Button> }
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

export default RoomCategoryControlForm;