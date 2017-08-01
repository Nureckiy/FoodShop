import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ControlledModal extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.toggle = this.toggle.bind(this);
  }

  render() {
    const { show } = this.state;
    const submitOptions = this.renderSubmitOptions();
    return (
      <Modal show={ show }>
        <Modal.Header className="no-border">
          <Modal.Title>{ this.getTitle() }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ this.renderChild() }</Modal.Body>
        <Modal.Footer className="no-border buttons">
          <Button onClick={ this.toggle }>Отмена</Button>
          <Button {...submitOptions} >Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  toggle() {
    const show = !this.state.show;
    this.setState({ show });
  }

  renderSubmitOptions() {
    const { onSubmit } = this.props;
    const children = this.renderChild();
    let options = {};
    if (children && children.props.formId) options.form = children.props.formId;
    options.onClick = onSubmit;
    options.type = 'submit';
    return options;
  }

  renderChild() {
    const { children } = this.props;
    return children;
  }

  getTitle() {
    return this.props.title;
  }
}

export default ControlledModal;
