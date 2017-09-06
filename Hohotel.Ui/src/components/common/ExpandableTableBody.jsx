import React, { Component } from 'react';

const Row = props => (
  <tr className={renderClassName(props.className, props.active, 'row-head')} onClick={props.onClick}>
    { props.children }
  </tr>
);

const Content = props => (
  <tr className="expandable-content">
    <td colSpan="100%">
      <div className={renderClassName(props.className, props.active || props.collapsed, 'row-collapse')}>
        <div>
          { props.children }
        </div>
      </div>
    </td>
  </tr>
);

class ExpandableTableBody extends Component {
  constructor() {
    super();
    this.state = {};
    this.renderChildProps = this.renderChildProps.bind(this);
  }
  render() {
    const { children } = this.props;
    return (
      <tbody>{ React.Children.map(children, child => React.cloneElement(child, this.renderChildProps(child))) }</tbody>
    );
  }
  renderChildProps(child) {
    const { activeKey } = this.state;
    if (!React.isValidElement(child)) {
      return {};
    }
    const { eventKey } = child.props;
    return {
      active: activeKey === eventKey,
      onClick: () => this.handleCollapse(eventKey)
    };
  }
  handleCollapse(eventKey) {
    let activeKey;
    if (this.state.activeKey !== eventKey) {
      activeKey = eventKey;
    }
    this.setState({ activeKey });
  }
}

ExpandableTableBody.Row = Row;
ExpandableTableBody.Content = Content;

export default ExpandableTableBody;

function renderClassName(className, active, innerClass) {
  let result = className ? className : '';
  result += active ? ' in ' : ' ';
  result += innerClass ? innerClass : '';
  return result;
}