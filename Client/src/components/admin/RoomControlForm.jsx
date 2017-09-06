import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import Select from '../common/Select.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import * as utils from '../../utils/utils';
import { Button } from 'react-bootstrap';

class RoomControlForm extends Component {
  componentDidMount() {
    const { loadCategories } = this.props;
    loadCategories();
  }

  render() {
    const { onSubmit, formId, categories, onRemove, translate } = this.props;
    const initialValues = this.prepareInitial();
    return (
      <ControlledForm onSubmit={ onSubmit } id={ formId } initialValues={ initialValues } >
        { onRemove && <Button bsStyle="danger" onClick={() => onRemove(initialValues.id)}>{translate('remove')}</Button> }
        <FormGroup>
          <Field
            id="address"
            type="text"
            label={translate('address')}
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
          <Field
            id="price"
            type="number"
            label={translate('price') + ', $'}
            min="0"
            step="0.01"
            required
          />
          <Select
            id="id"
            section="category"
            label={translate('category')}
            options={utils.renderObjectArrayOptions(categories)}
            required
          />
        </FormGroup>
      </ControlledForm>
    );
  }

  prepareInitial() {
    const { initial, defaultCategory } = this.props;
    let initialValues = initial ? initial : {};
    let category = initialValues.category ? initialValues.category : defaultCategory;
    if (category) {
      category = { id: category.id, name: category.name };
    }
    initialValues.category = category;
    return initialValues;
  }
}

export default RoomControlForm;