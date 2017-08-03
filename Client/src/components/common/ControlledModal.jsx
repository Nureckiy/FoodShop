import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ControlledModal extends Component {
  render() {
    const show = this.state && this.state.show;
    const submitOptions = this.renderSubmitOptions();
    return (
      <Modal show={ show }>
        <Modal.Header className="no-border">
          <Modal.Title>{ this.getTitle() }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ this.renderChild() }</Modal.Body>
        <Modal.Footer className="no-border buttons">
          <Button onClick={ this.close.bind(this) }>Отмена</Button>
          <Button {...submitOptions} >Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  close() {
    const { onClose } = this.props;
    onClose && onClose();
    this.toggle();
  }

  toggle() {
    const show = !this.state.show;
    this.setState({ show });
  }

  renderSubmitOptions() {
    const { onSubmit } = this.props;
    const children = this.renderChild();
    let options = {};
    if (children[0] && children[0].props.formId) options.form = children[0].props.formId;
    options.onClick = onSubmit;
    options.type = 'submit';
    return options;
  }

  renderChild() {
    const { children } = this.props;
    return React.Children.toArray(children);
  }

  getTitle() {
    return this.props.title;
  }
}

export default ControlledModal;
