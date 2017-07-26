import React, { Component } from 'react';

import { ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class Field extends Component {
  renderLabel() {
    const { label, id, type } = this.props;
    let { labelClass } = this.props;
    if (!label) return;
    if (!labelClass) {
      labelClass = '';
    }
    if (type === 'checkbox') {
      return <ControlLabel
        id="samLabel"
        className={'check-label black ' + labelClass}
        htmlFor={id}
      >
        <span/>
        {label}
      </ControlLabel>;
    }
    return <ControlLabel htmlFor={id} className={labelClass}>{label}</ControlLabel>;
  }
  render() {
    const { help, type, required, onChange, id, value } = this.props;
    let { className } = this.props;
    if (!className) {
      className = '';
    }
    const label = this.renderLabel();
    const inputOption = { type, required, onChange, id, value };
    return (
      <span className={className}>
        { type !== 'checkbox' && label }
        <FormControl {...inputOption} />
        { type === 'checkbox' && label }
        {help && <HelpBlock>{help}</HelpBlock>}
      </span>
    );
  }
}

export default Field;