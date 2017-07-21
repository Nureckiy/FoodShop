import React, { Component } from 'react';
import { FormControl, ControlLabel } from 'react-bootstrap';

class RenderSelect extends Component {
  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.state = {
      value: defaultValue
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const { onChange } = this.props;
    this.setState({ value: event.target.value });
    onChange(event);
  }
  render() {
    const { options, id, className, label, controlClass, required } = this.props;
    const { value } = this.state;
    return(
      <span className={className}>
        {label && <ControlLabel>{label}</ControlLabel>}
        <FormControl
          componentClass="select"
          className={controlClass}
          id={id}
          value={value}
          onChange={this.handleChange}
          required={required}
        >
          <option></option>
          {options.map((item) => (
            <option key={item.value} value={item.value}>{item.text}</option>
          ))}
        </FormControl>
      </span>
    );
  }
}

export default RenderSelect;