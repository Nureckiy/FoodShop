import React, { Component } from 'react';
import { FormControl, ControlLabel } from 'react-bootstrap';

class RenderSelect extends Component {
  componentWillMount() {
    const { id, defaultValue, onChange } = this.props;
    if (defaultValue) {
      onChange({ target: { id, value: defaultValue }});
    }
  }
  render() {
    const { options, id, className, label, controlClass, required, value, defaultEmptyOption, onChange } = this.props;
    let { labelClass } = this.props;
    if(required) {
      labelClass = '' + labelClass + ' required';
    }
    const inputOption = { required, id, value, onChange };
    return(
      <span className={className}>
        {label && <ControlLabel className={labelClass}>{label}</ControlLabel>}
        <FormControl
          componentClass="select"
          className={controlClass}
          { ...inputOption }
        >
          { defaultEmptyOption && <option /> }
          {options.map((item) => (
            <option key={item.value} value={item.value}>{item.text}</option>
          ))}
        </FormControl>
      </span>
    );
  }
}

export default RenderSelect;