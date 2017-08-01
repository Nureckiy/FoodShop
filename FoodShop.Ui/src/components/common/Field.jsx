import React, { Component } from 'react';

import { ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class Field extends Component {
  render() {
    const { help, type, value } = this.props;
    let { className } = this.props;
    if (!className) {
      className = '';
    }
    const label = this.renderLabel();
    let inputOptions = this.props;
    delete inputOptions.section;
    return (
      <span className={className}>
        { type !== 'checkbox' && label }
        <FormControl {...inputOptions} value={value ? value : ''} />
        { type === 'checkbox' && label }
        {help && <HelpBlock>{help}</HelpBlock>}
      </span>
    );
  }

  renderLabel() {
    const { label, id, type, required } = this.props;
    let { labelClass } = this.props;
    if (!label) return;
    labelClass = `${required?'required':''} ${labelClass}`;
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
}

export default Field;