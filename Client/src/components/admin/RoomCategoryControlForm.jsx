import React from 'react';
import { FormGroup, Button } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';

const RoomCategoryControlForm = props => (
  <ControlledForm onSubmit={ props.onSubmit } id={ props.formId } initialValues={props.initial} >
    { props.onRemove && <Button bsStyle="danger" onClick={() => props.onRemove(props.initial.id)}>Удалить</Button> }
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
        min="0"
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

export default RoomCategoryControlForm;