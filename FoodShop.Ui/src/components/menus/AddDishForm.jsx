/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import RenderSelect from '../common/RenderSelect.jsx';
import * as utils from '../../utils/utils';

class AddDishForm extends Component {
  constructor(props) {
    super(props);
    const { selected } = props.model;
    this.state = {
      currentSelected: selected ? selected : []
    };
    this.getSelected = this.getSelected.bind(this);
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
  render() {
    const { model: { dishPortions } } = this.props;
    const { currentSelected } = this.state;
    const values = utils.renderNumberOptions(10);
    return (
      <Table responsive className="options-table">
        <thead>
        <tr>
          <th>Цена</th>
          <th>Вес</th>
          <th>Размер</th>
          <th>Количество</th>
        </tr>
        </thead>
        <tbody>
        {dishPortions && dishPortions.map((item, key) =>
          <tr key={key}>
            <th>${item.price}</th>
            <th>{item.weight}</th>
            <th>{item.size}</th>
            <th>
              <RenderSelect
                value={utils.findNumber(currentSelected, item.id)}
                onChange={e => this.handleSelect(e, item)}
                options={values}
              />
            </th>
          </tr>
        )}
        </tbody>
      </Table>
    );
  }
}

export default AddDishForm;