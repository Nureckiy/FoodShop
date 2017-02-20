import React, { Component } from 'react';

class RenderSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const { onChange } = this.props;
    const { value } = event.target;
    this.setState({ value });
    onChange(value);
  }
  render() {
    const { options } = this.props;
    const { value } = this.state;
    return(
      <select
        className="select_price"
        value={value}
        onChange={this.handleChange}
      >
        {options.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.text}
          </option>
        ))}
      </select>
    );
  }
}

export default RenderSelect;