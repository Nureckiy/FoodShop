import React, { Component } from 'react';
import { FormGroup, Button, Glyphicon } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import Select from '../common/RenderSelect';
import FieldArray from '../common/FieldArray';
import * as utils from '../../utils/utils';
import { mainCategories } from '!json!../../sources/appVariables.json';

class DishControlForm extends Component {
  render() {
    const { onSubmit, formId, defaultCategory, initialValues, onRemove } = this.props;
    let initial = initialValues;
    if(!initial) {
      const category = defaultCategory ? defaultCategory : Object.keys(mainCategories)[0];
      initial = { category };
    }
    return (
      <ControlledForm onSubmit={ onSubmit } id={ formId } initialValues={ initial }>
        { onRemove && <Button bsStyle="danger" onClick={() => onRemove(initial.id)}>Удалить</Button> }
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
          <FieldArray id="dishPortions" ref="portions">
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
              required
            />
          </FieldArray>
          <Button bsStyle="success" bsClass="small btn" onClick={() => this.refs.portions.pushField()}>
            <Glyphicon glyph="plus" />
          </Button>
        </FormGroup>
      </ControlledForm>
    );
  }
}

export default DishControlForm;