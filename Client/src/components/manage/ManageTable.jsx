/*eslint no-unused-vars: "off"*/

import React, { Component } from 'react';
import { Table, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

import ExpandableTableBody from '../common/ExpandableTableBody.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import Select from '../common/Select.jsx';
import * as utils from '../../utils/utils';
import { orderStatuses } from '!json!../../sources/appVariables.json';

class ManageTable extends Component {
  constructor() {
    super();
    this.state = ({
      processed: [],
      error: {}
    });
  }

  render() {
    const { activeRequestStatus, items, titles } = this.props;
    return (
      <div className="container content">
        <div className="row">
          <Table hover responsive bsClass="manage-table table">
            <thead>
            <tr>
              { titles.map((title, key) => <th key={key}>{title}</th>) }
              <th/>
            </tr>
            </thead>
            <ExpandableTableBody>
              { activeRequestStatus
                ? <ExpandableTableBody.Content collapsed><LoadingComponent showLoader/></ExpandableTableBody.Content>
                : items.map(item => this.renderField(item))
              }
            </ExpandableTableBody>
          </Table>
        </div>
      </div>
    );
  }

  renderField(item) {
    const { id, status } = item;
    const { getHeaderValues, renderBody, translate } = this.props;
    const { processed, error } = this.state;
    return [
      <ExpandableTableBody.Row eventKey={id}>
        { getHeaderValues(item).map((value, index) => <td key={index}>{ value }</td>)}
        <td>
          <Select
            options={utils.getProcessedOptions(orderStatuses, (item) => translate(item))}
            value={status}
            onChange={(event) => this.handleStatusChange(event, id)}
            onClick={e => e.stopPropagation()}
          />
        </td>
        <td className="text-center">
          <LoadingComponent small showLoader={processed.includes(id)}/>
          {error[id] && !processed.includes(id) &&
            <ErrorSection text={error[id]} />
          }</td>
      </ExpandableTableBody.Row>,
      <ExpandableTableBody.Content eventKey={id}>
        { renderBody(item) }
      </ExpandableTableBody.Content>
    ];
  }

  handleStatusChange(event, id) {
    const { onStatusChange } = this.props;
    const { processed } = this.state;
    processed.push(id);
    this.setState({ processed });
    onStatusChange(id, event.target.value)
      .then(() => this.resolveProcessed(id))
      .fail((error) => this.rejectProcessed(id, error));
  }

  resolveProcessed(id) {
    this.removeFromProcessed(id);
    let { error } = this.state;
    delete error[id];
    this.setState({ error });
  }

  rejectProcessed(id, err) {
    this.removeFromProcessed(id);
    let { error } = this.state;
    error[id] = err.status === 400
      ? JSON.parse(err.responseText).error
      : this.props.translate('errorOccurred');
    this.setState({ error });
  }

  removeFromProcessed(id) {
    this.setState(prevState => ({
      processed: utils.removeElementFromArray(prevState.processed, id)
    }));
  }
}

const ErrorSection = ({text}) => (
  <OverlayTrigger
    placement="bottom"
    overlay={<Tooltip id={text}>{text}</Tooltip>}>
    <Glyphicon glyph="remove-circle error icon"/>
  </OverlayTrigger>
);

export default ManageTable;