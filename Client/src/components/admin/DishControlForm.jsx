import React from 'react';
import { FormGroup, Button, Glyphicon } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import Select from '../common/Select';
import FieldArray from '../common/FieldArray';
import * as utils from '../../utils/utils';
import { mainCategories } from '!json!../../sources/appVariables.json';

const DishControlForm = ({formId, defaultCategory, initialValues, onRemove, onSubmit, translate}) => {
  let portions;
  return (
    <ControlledForm onSubmit={ onSubmit } id={ formId } initialValues={ transformInitial(initialValues, defaultCategory) }>
      { onRemove && <Button bsStyle="danger" onClick={() => onRemove(initialValues.id)}>{translate('remove')}</Button> }
      <FormGroup>
        <Field
          id="name"
          type="text"
          label={translate('itemName')}
          required
        />
        <Field
          id="description"
          type="text"
          label={translate('description')}
        />
        <Field
          id="imageUrl"
          type="text"
          label={translate('imgLink')}
        />
        <Select
          id="category"
          label={translate('type')}
          defaultValue={defaultCategory}
          options={utils.renderObjectOptions(mainCategories)}
          required
        />
      </FormGroup>
      <h4>{translate('portions')}</h4>
      <FormGroup>
        <FieldArray id="dishPortions" ref={(input) => portions = input}>
          <Field
            id="size"
            type="text"
            label={translate('size')}
          />
          <Field
            id="weight"
            type="text"
            label={translate('weight')}
          />
          <Field
            id="price"
            type="number"
            label={translate('price') + ', $'}
            min="0"
            step="0.01"
            required
          />
        </FieldArray>
        <Button bsStyle="success" bsClass="small btn" onClick={() => portions.pushField()}>
          <Glyphicon glyph="plus" />
        </Button>
      </FormGroup>
    </ControlledForm>
  );
};

const transformInitial = (initial, defaultCategory) => {
  if(!initial) {
    initial = { category: defaultCategory
      ? defaultCategory
      : Object.keys(mainCategories)[0]  };
  }
  return initial;
};

export default DishControlForm;