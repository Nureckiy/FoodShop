import React, { Component } from 'react';

import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class FieldGroup extends Component {
  render() {
    const { name, label, help } = this.props;
    return (
      <FormGroup controlId={name} className="form-group">
        {label && <ControlLabel>{label}</ControlLabel>}
        <FormControl {...this.props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
}

export default FieldGroup;