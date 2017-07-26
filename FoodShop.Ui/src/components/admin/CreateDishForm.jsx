import React, { Component } from 'react';
import { FormGroup, Button, Glyphicon } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import Select from '../common/RenderSelect';
import FieldArray from '../common/FieldArray';
import * as utils from '../../utils/utils';

import { mainCategories } from '!json!../../sources/appVariables.json';

class AddDishModal extends Component {
  render() {
    const { onSubmit, formId } = this.props;
    return (
      <ControlledForm onSubmit={ onSubmit } id={ formId }>
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
            options={utils.renderObjectOptions(mainCategories)}
            controlClass="select-number"
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
              required
            />
            <Field
              id="weight"
              type="number"
              label="Вес"
            />
            <Field
              id="price"
              type="number"
              label="Стоимость"
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

export default AddDishModal;