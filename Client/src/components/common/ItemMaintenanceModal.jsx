import React from 'react';

import ControlledModal from '../common/ControlledModal.jsx';

class ItemMaintenanceModal extends ControlledModal {

  getTitle() {
    const { title } = this.props;
    return title ? title : this.state.title;
  }

  renderChild() {
    const { children } = this.props;
    const options = this.getChildOptions();
    return React.cloneElement(children, options);
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

  openInCreateMode() {
    this.setState({ title: 'Создать', modalType: 'create'});
    this.toggle();
  }

  openInEditMode() {
    this.setState({ title: 'Редактировать', modalType: 'edit' });
    this.toggle();
  }
}

export default ItemMaintenanceModal;