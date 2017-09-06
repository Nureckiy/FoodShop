import React, { Component } from 'react';

import ControlledModal from '../common/ControlledModal.jsx';

class ResponsiveActionModal extends Component {
  constructor() {
    super();
    this.state = {};
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  render() {
    const { show, children, title, translate } = this.props;
    const { error } = this.state;
    const functions = this.bindResponsiveActions();
    return (
      <ControlledModal show={show} error={error} close={this.resolve} title={title} translate={translate}>
        { React.cloneElement(children, Object.assign({}, ...functions)) }
      </ControlledModal>
    );
  }

  bindResponsiveActions() {
    const { responsiveActions } = this.props;
    return Object.keys(responsiveActions).map(key => {
      return { [key]: this.handleResponsiveAction(responsiveActions[key]) };
    });
  }

  handleResponsiveAction(action) {
    return data => action(data)
      .then(this.resolve)
      .fail(this.reject);
  }

  resolve() {
    this.setState({ error: false });
    this.props.close();
  }

  reject() {
    this.setState({ error: this.props.translate('errorOccurred')});
  }
}

export default ResponsiveActionModal;