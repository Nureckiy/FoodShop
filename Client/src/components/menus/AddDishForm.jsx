import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';

import Select from '../common/Select.jsx';
import * as utils from '../../utils/utils';

class AddDishForm extends Component {
  constructor(props) {
    super(props);
    const { selected } = props.model;
    this.state = {
      currentSelected: selected ? selected : []
    };
    this.getSelected = this.getSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { model: { id, selected } } = props;
    const oldId = this.props.model.id;
    if (id !== oldId) {
      this.setState({
        currentSelected: selected ? selected : []
      });
    }
  }

  render() {
    const { formId,  model: { dishPortions }, translate } = this.props;
    const { currentSelected } = this.state;
    const values = utils.renderNumberOptions(10);
    return (
      <Form onSubmit={this.handleSubmit} id={formId} >
        <Table responsive className="options-table">
          <thead>
          <tr>
            <th>{translate('price')}</th>
            <th>{translate('weight')}</th>
            <th>{translate('size')}</th>
            <th>{translate('quantity')}</th>
          </tr>
          </thead>
          <tbody>
          {dishPortions && dishPortions.map((item, key) =>
            <tr key={key}>
              <th>${item.price}</th>
              <th>{item.weight}</th>
              <th>{item.size}</th>
              <th>
                <Select
                  value={utils.findNumber(currentSelected, item.id)}
                  onChange={e => this.handleSelect(e, item)}
                  options={values}
                />
              </th>
            </tr>
          )}
          </tbody>
        </Table>
      </Form>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit, model } = this.props;
    const { currentSelected } = this.state;
    model.selected = currentSelected;
    onSubmit(model);
  }

  getSelected() {
    const { currentSelected } = this.state;
    let { model } = this.props;
    model.selected = currentSelected;
    return model;
  }

  handleSelect(event, dish) {
    const { currentSelected } = this.state;
    dish.number = event.target.value;
    this.setState({
      currentSelected: utils.mergeSelectedConfigurations(currentSelected, dish)
    });
  }
}

export default AddDishForm;