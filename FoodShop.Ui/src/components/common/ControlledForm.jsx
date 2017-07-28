import React, { Component } from 'react';
import { Form, FormGroup } from 'react-bootstrap';

import * as utils from '../../utils/utils';

class ControlledForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialValues ? props.initialValues : {};
    this.renderOnChange = this.renderOnChange.bind(this);
    this.renderSubmit = this.renderSubmit.bind(this);
  }
  componentWillReceiveProps(props) {
    const { initialValues } = props;
    const oldInitial = this.props.initialValues;
    if (initialValues !== oldInitial) {
      this.setState( initialValues );
    }
  }
  renderChilds() {
    const { children } = this.props;
    return utils.mapChildren(children, (child, key) => this.renderChild(child, key));
  }
  renderChild(child, key) {
    let newProps = { key };
    if (child.type === FormGroup || child.props && child.props.className && child.props.className.includes('form-group')) {
      newProps.children = this.transformFormGroupChildren(child);
    }
    return React.cloneElement(child, newProps);
  }
  transformFormGroupChildren(item) {
    return utils.mapChildren(item.props.children, (child, key) =>
      this.cloneObject(child, {
        ...this.renderValue(child),
        key,
        onChange: (event) => this.renderOnChange(event, child)
      })
    );
  }
  cloneObject(item, props) {
    if(item && item.props) {
      return React.cloneElement(item, props);
    }
  }
  renderValue(child) {
    if(!child || !child.props) return;
    const { type, id, section } = child.props;
    const value = section
      ? this.state[section][id]
      : this.state[id];
    return type === 'checkbox'
      ? { checked:  value }
      : { value };
  }
  renderOnChange(event, child) {
    const { onChange, section } = child.props;
    onChange && onChange(event);
    this.handleChildChange(event, section);
  }
  handleChildChange(event, section) {
    const { type, checked, value, id } = event.target;
    const itemValue = type === 'checkbox' ? checked : value;
    let item = { [id]: itemValue };
    if(section) {
      let sectionItem = this.state[section];
      sectionItem[id] = itemValue;
      item = { [section]: sectionItem };
    }
    this.setState(item);
  }
  renderSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }
  render() {
    const { className, id } = this.props;
    const children = this.renderChilds();
    return (
      <Form className={className} onSubmit={this.renderSubmit} id={id}>
        { children }
      </Form>
    );
  }
}

export default ControlledForm;