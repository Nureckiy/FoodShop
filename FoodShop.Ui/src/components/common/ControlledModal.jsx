/*eslint no-unused-vars: "off"*/
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
  toggle() {
    const show = !this.state.show;
    this.setState({ show });
  }
  renderSubmitOptions() {
    const { children, onSubmit } = this.props;
    let options = {};
    if (children && children.props.formId) options.form = children.props.formId;
    if (onSubmit) options.onClick = onSubmit;
    return options;
  }
  render() {
    const { title, children } = this.props;
    const { show } = this.state;
    const submitOptions = this.renderSubmitOptions();
    return (
      <Modal show={ show }>
        <Modal.Header className="no-border">
          <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ children }</Modal.Body>
        <Modal.Footer className="no-border buttons">
          <Button onClick={ this.toggle }>Отмена</Button>
          <Button type="submit" {...submitOptions} >Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ControlledModal;
