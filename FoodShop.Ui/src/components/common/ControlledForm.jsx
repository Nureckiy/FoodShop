/*eslint no-unused-vars: "off"*/

import React, { Component } from 'react';
import { Form, FormGroup } from 'react-bootstrap';

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
  handleChildChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;
    this.setState({
      [name]: value
    });
  }
  renderChilds() {
    const { children } = this.props;
    let result = [];
    mapChildren(children, (child, key) => {
      result.push(this.renderChild(child, key));
    });
    return result;
  }
  renderChild(child, key) {
    let newProps = { key };
    if (child.type === FormGroup || child.props.className.includes('form-group')) {
      newProps.children = this.transformFormGroupChildren(child);
    }
    return React.cloneElement(child, newProps);
  }
  transformFormGroupChildren(item) {
    let result = [];
    mapChildren(item.props.children, (child, key) => {
      const value = child.props.type === 'checkbox'
        ? { checked:  this.state[child.props.id] }
        : { value:  this.state[child.props.id] };
      result.push(React.cloneElement(child, {
        ...value,
        key,
        onChange: (event) => this.renderOnChange(event, child)
      }));
    });
    return result;
  }
  renderOnChange(event, child) {
    if (child.props.onChange) {
      child.props.onChange(event);
    }
    this.handleChildChange(event);
  }
  renderSubmit() {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }
  render() {
    const { className } = this.props;
    const children = this.renderChilds();
    return (
      <Form className={className} onSubmit={this.renderSubmit}>
        { children }
      </Form>
    );
  }
}

function mapChildren(children, callback) {
  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child, index) => callback(child, index));
    } else {
      callback(children, 0);
    }
  }
}

export default ControlledForm;