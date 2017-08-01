import React, { Component } from 'react';
import { FormControl, ControlLabel } from 'react-bootstrap';

import * as utils from '../../utils/utils';

class Select extends Component {
  componentWillMount() {
    const { id, defaultValue, onChange } = this.props;
    if (defaultValue) {
      onChange({ target: { id, value: defaultValue }});
    }
  }
  render() {
    const { options, className, label, controlClass, required, defaultEmptyOption } = this.props;
    let { labelClass } = this.props;
    if(required) {
      labelClass = '' + labelClass + ' required';
    }
    let inputOptions = Object.assign({}, this.props, {className: {controlClass}, componentClass: 'select'});
    utils.deleteProps(inputOptions, ['section', 'options', 'labelClass', 'defaultEmptyOption']);
    return(
      <span className={className}>
        {label && <ControlLabel className={labelClass}>{label}</ControlLabel>}
        <FormControl { ...inputOptions }>
          { defaultEmptyOption && <option /> }
          {options.map((item) => (
            <option key={item.value} value={item.value}>{item.text}</option>
          ))}
        </FormControl>
      </span>
    );
  }
}

export default Select;