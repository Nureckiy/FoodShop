import React from 'react';
import { FormGroup, Button } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';

const RoomCategoryControlForm = props => (
  <ControlledForm onSubmit={ props.onSubmit } id={ props.formId } initialValues={props.initial} >
    { props.onRemove &&
      <Button bsStyle="danger" onClick={() => props.onRemove(props.initial.id)}>{props.translate('remove')}</Button>
    }
    <FormGroup>
      <Field
        id="name"
        type="text"
        label={props.translate('itemName')}
        required
      />
      <Field
        id="guestsNumber"
        type="number"
        label={props.translate('guestsQuantity')}
        min="0"
        required
      />
      <Field
        id="description"
        type="text"
        label={props.translate('description')}
      />
      <Field
        id="coverUrl"
        type="text"
        label={props.translate('imgLink')}
      />
    </FormGroup>
  </ControlledForm>
);

export default RoomCategoryControlForm;