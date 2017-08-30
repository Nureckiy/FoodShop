import React from 'react';

import { ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const Field = props => {
  const { help, type, value, className } = props;
  const label = <Label {...props} />;
  let inputOptions = props;
  delete inputOptions.section;
  return (
    <span className={composeClassName(className)}>
      { type !== 'checkbox' && label }
      <FormControl {...inputOptions} value={value ? value : ''} />
      { type === 'checkbox' && label }
      {help && <HelpBlock>{help}</HelpBlock>}
    </span>
  );
};

const Label = props => {
  const { label, id, type, required, labelClass } = props;
  if (!label) return null;
  let labelClassName = composeClassName(labelClass, 'check-label black ' + required ? 'required' : '');
  if (type === 'checkbox') {
    return (
      <ControlLabel id="samLabel" className={labelClassName} htmlFor={id}>
        <span/>{label}
      </ControlLabel>
    );
  }
  return <ControlLabel htmlFor={id} className={labelClassName}>{label}</ControlLabel>;
};

function composeClassName(className, additional) {
  let result = '';
  if(className) result += className;
  if(additional) result += ' ' + additional;
  return result;
}

export default Field;