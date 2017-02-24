import React, { Component } from 'react';

import { ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class FieldGroup extends Component {
  render() {
    const { label, help } = this.props;
    let { className } = this.props;
    if (!className) {
      className = '';
    }
    return (
      <span className={className}>
        {label && <ControlLabel>{label}</ControlLabel>}
        <FormControl {...this.props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </span>
    );
  }
}

export default FieldGroup;