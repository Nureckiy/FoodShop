import React from 'react';
import { Collapse, Alert } from 'react-bootstrap';

import ControlledModal from '../common/ControlledModal.jsx';

class ItemMaintenanceModal extends ControlledModal {

  constructor() {
    super();
    this.state = {};
  }

  getTitle() {
    const { title } = this.props;
    return title ? title : this.state.title;
  }

  close() {
    const { onClose } = this.props;
    onClose && onClose();
    this.resolveError();
    this.toggle();
  }

  openInCreateMode() {
    this.setState({ title: 'Создать', modalType: 'create'});
    this.toggle();
  }

  openInEditMode() {
    this.setState({ title: 'Редактировать', modalType: 'edit' });
    this.toggle();
  }

  renderChild() {
    const { children } = this.props;
    const options = this.composeOptions();
    let childs = React.Children.toArray(children);
    childs[0] = React.cloneElement(childs[0], options);
    childs.push(this.renderErrorSection());
    return childs.map((child, key) => React.cloneElement(child, { key }));
  }

  composeOptions() {
    let options = this.getChildOptions();
    if (!options) return;
    const functions = options.submitFunctions ? this.transformFunctions(options.submitFunctions): [];
    options = Object.assign({}, options, ...functions);
    delete options.submitFunctions;
    return options;
  }

  getChildOptions() {
    const { modalType } = this.state;
    const { createOptions, editOptions } = this.props;
    if (modalType === 'create') {
      return createOptions;
    } else if (modalType === 'edit') {
      return editOptions;
    }
  }

  // transform to wait for completion submit functions and show error when fail

  transformFunctions(functions) {
    return Object.keys(functions).map(key => {
      return { [key]: this.modalSubmit(functions[key]) };
    });
  }

  modalSubmit(action) {
    return values => action(values)
      .then(() => this.resolveError())
      .fail(() => this.rejectError());
  }

  resolveError() {
    this.setState({ error: false });
    this.toggle();
  }

  rejectError() {
    this.setState({ error:  'Что-то пошло не так. Повторите попытку позже.' });
  }

  renderErrorSection() {
    const { error } = this.state;
    return (
      <Collapse in={!!error}>
        <Alert bsStyle="danger">
          <p>{ error }</p>
        </Alert>
      </Collapse>
    );
  }
}

export default ItemMaintenanceModal;