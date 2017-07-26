import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import * as utils from '../../utils/utils';

class FieldArray extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.removeField = this.removeField.bind(this);
  }
  pushField() {
    this.change(values => values.push({}));
  }
  onChange(index, fieldValues) {
    this.change(values => values[index] = fieldValues);
  }
  removeField(index) {
    this.change(values => values.splice(index, 1));
  }
  change(callback) {
    const { onChange, id } = this.props;
    let value = Object.assign([], this.props.value);
    callback(value);
    onChange({ target: { value, id }});
  }
  render() {
    const { children, value } = this.props;
    return (
      <span>
        { value && value.map((item, index) =>
          <div key={ index } className="fieldarray-group">
            <Button
              bsStyle="danger"
              bsClass="pull-right small adjoined btn"
              onClick={() => this.removeField(index)}
            ><Glyphicon glyph="remove" /></Button>
            { renderFieldsGroup(item, children, (values) => this.onChange(index, values)) }
          </div>
        )}
      </span>
    );
  }
}

const renderFieldsGroup = (values, children, handleChange) => {
  function onChange(event) {
    const { id, value } = event.target;
    values = Object.assign({}, values, { [id]: value });
    handleChange(values);
  }
  return utils.mapChildren(children, (child, key) =>
    React.cloneElement(child, { key, value: values[child.props.id], onChange })
  );
};

export default FieldArray;
