import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import Select from '../common/RenderSelect.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import * as utils from '../../utils/utils';
import { Button } from 'react-bootstrap';

class RoomControlForm extends Component {
  componentWillMount() {
    const { loadCategories } = this.props;
    loadCategories();
  }
  prepareInitial() {
    const { initial, defaultCategory } = this.props;
    let initialValues = initial ? initial : {};
    let category = defaultCategory ? defaultCategory : initialValues.category;
    if (category) {
      category = { id: category.id, name: category.name };
    }
    initialValues.category = category;
    return initialValues;
  }
  render() {
    const { onSubmit, formId, categories, initial, onRemove } = this.props;
    const initialValues = this.prepareInitial(initial);
    return (
      <ControlledForm onSubmit={ onSubmit } id={ formId } initialValues={ initialValues } >
        { onRemove && <Button bsStyle="danger" onClick={() => onRemove(initialValues.id)}>Удалить</Button> }
        <FormGroup>
          <Field
            id="address"
            type="text"
            label="Адрес"
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
          <Field
            id="price"
            type="number"
            label="Стоимость за сутки, $"
            required
          />
          <Select
            id="id"
            section="category"
            label="Категория"
            options={utils.renderObjectArrayOptions(categories)}
            required
          />
        </FormGroup>
      </ControlledForm>
    );
  }
}

export default RoomControlForm;