/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import RenderSelect from '../common/RenderSelect.jsx';
import * as utils from '../../utils/utils';

class AddGoodModal extends Component {
  constructor(props) {
    super(props);
    const { selected } = props.model;
    this.state = {
      currentSelected: selected ? selected : []
    };
    this.onSave = this.onSave.bind(this);
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
  onSave() {
    const { onSave } = this.props;
    const { currentSelected } = this.state;
    let { model } = this.props;
    model.selected = currentSelected;
    onSave(model);
  }
  handleSelect(event, dish) {
    const { currentSelected } = this.state;
    dish.number = event.target.value;
    this.setState({
      currentSelected: utils.mergeSelectedConfigurations(currentSelected, dish)
    });
  }
  render() {
    const { show, onHide, model: { dishPortions } } = this.props;
    const { currentSelected } = this.state;
    const values = utils.renderNumberOptions(10);
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header className="no-border">
          <Modal.Title>Добавить в корзину</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                      defaultValue={utils.findNumber(currentSelected, item.id)}
                      onChange={e => this.handleSelect(e, item)}
                      options={values}
                      controlClass="select-number"
                    />
                  </th>
                </tr>
            )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className="no-border">
          <div className="buttons pull-right">
            <Button onClick={onHide}>Отмена</Button>
            <Button onClick={this.onSave}>Добавить</Button>
          </div>
        </Modal.Footer>
      </Modal>

    );
  }
}

export default AddGoodModal;