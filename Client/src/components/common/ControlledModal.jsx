import React from 'react';
import { Modal, Button, Collapse, Alert } from 'react-bootstrap';

const ControlledModal = props => (
  <Modal show={ props.show }>
    <Modal.Header className="no-border">
      <Modal.Title>{ props.title }</Modal.Title>
    </Modal.Header>
    <Modal.Body>{ props.children }</Modal.Body>
    <Modal.Footer className="no-border buttons">
      <Collapse in={!!props.error}>
        <Alert bsStyle="danger">
          <p>{ props.error }</p>
        </Alert>
      </Collapse>
      <Button onClick={ props.close }>{props.translate('cancel')}</Button>
      <Button {...renderSubmitOptions(props.onSubmit, props.children)} >{props.translate('submit')}</Button>
    </Modal.Footer>
  </Modal>
);

function renderSubmitOptions(onSubmit, children) {
  let options = {};
  options.form = getFormId(children);
  options.onClick = onSubmit;
  options.type = 'submit';
  return options;
}

function getFormId(children) {
  if (!children) return;
  const firstChild = React.Children.toArray(children)[0];
  return firstChild.props.formId;
}

export default ControlledModal;
