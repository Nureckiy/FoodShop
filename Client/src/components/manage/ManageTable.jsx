import React from 'react';
import { Table } from 'react-bootstrap';

import ExpandableTableBody from '../common/ExpandableTableBody.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import Select from '../common/Select.jsx';
import * as utils from '../../utils/utils';
import { orderStatuses } from '!json!../../sources/appVariables.json';

const ManageTable = props => {
  const { activeRequestStatus, items, titles } = props;
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
              : items.map(item => renderField(item))
            }
          </ExpandableTableBody>
        </Table>
      </div>
    </div>
  );

  function renderField(item) {
    const { id, status } = item;
    const { getHeaderValues, renderBody, processedItems } = props;
    return [
      <ExpandableTableBody.Row eventKey={id}>
        { getHeaderValues(item).map((value, index) => <td key={index}>{ value }</td>)}
        <td>
          <Select
            options={utils.getProcessedOptions(orderStatuses, (item) => props.translate(item))}
            value={status}
            onChange={handleStatusChange(id)}
            onClick={e => e.stopPropagation()}
          />
        </td>
        <td><LoadingComponent small showLoader={processedItems.includes(id)} /></td>
      </ExpandableTableBody.Row>,
      <ExpandableTableBody.Content eventKey={id}>
        { renderBody(item) }
      </ExpandableTableBody.Content>
    ];
  }

  function handleStatusChange(id) {
    const { onStatusChange } = props;
    return event => onStatusChange(id, event.target.value);
  }
};

export default ManageTable;