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
    const { model: { Id, selected } } = props;
    const oldId = this.props.model.Id;
    if (Id !== oldId) {
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
  handleSelect(value, good) {
    const { currentSelected } = this.state;
    good.number = value;
    this.setState({
      currentSelected: utils.mergeSelected(currentSelected, good)
    });
  }
  render() {
    const { show, onHide, model } = this.props;
    const { currentSelected } = this.state;
    const values = utils.renderNumberOptions(10);
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Добавить в корзину</Modal.Title>
          <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>Цена</th>
                  <th>Вес</th>
                  <th>Размер</th>
                  <th>Количество</th>
                </tr>
              </thead>
              <tbody>
              {model.Configurations && model.Configurations.map((item, key) =>
                  <tr key={key}>
                    <th>{item.Price}</th>
                    <th>{item.Weight}</th>
                    <th>{item.Size}</th>
                    <th>
                      <RenderSelect
                        defaultValue={utils.findNumber(currentSelected, item.Id)}
                        onChange={v => this.handleSelect(v, item)}
                        options={values}
                      />
                    </th>
                  </tr>
              )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Отмена</Button>
            <Button onClick={this.onSave}>Добавить</Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    );
  }
}

export default AddGoodModal;