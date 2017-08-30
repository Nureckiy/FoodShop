import React from 'react';
import { FormGroup, Button, Glyphicon } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import Select from '../common/Select';
import FieldArray from '../common/FieldArray';
import * as utils from '../../utils/utils';
import { mainCategories } from '!json!../../sources/appVariables.json';

const DishControlForm = ({formId, defaultCategory, initialValues, onRemove, onSubmit}) => {
  let portions;
  return (
    <ControlledForm onSubmit={ onSubmit } id={ formId } initialValues={ transformInitial(initialValues, defaultCategory) }>
      { onRemove && <Button bsStyle="danger" onClick={() => onRemove(initialValues.id)}>Удалить</Button> }
      <FormGroup>
        <Field
          id="name"
          type="text"
          label="Название"
          required
        />
        <Field
          id="description"
          type="text"
          label="Описание"
        />
        <Field
          id="imageUrl"
          type="text"
          label="Ссылка на изображение"
        />
        <Select
          id="category"
          label="Тип"
          defaultValue={defaultCategory}
          options={utils.renderObjectOptions(mainCategories)}
          required
        />
      </FormGroup>
      <h4>Порции</h4>
      <FormGroup>
        <FieldArray id="dishPortions" ref={(input) => portions = input}>
          <Field
            id="size"
            type="text"
            label="Размер"
          />
          <Field
            id="weight"
            type="text"
            label="Вес"
          />
          <Field
            id="price"
            type="number"
            label="Стоимость, $"
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