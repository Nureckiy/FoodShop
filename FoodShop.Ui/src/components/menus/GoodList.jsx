import React, { Component } from 'react';

import ControlledModal from '../common/ControlledModal.jsx';
import Tile from '../common/Tile.jsx';
import AddDishForm from './AddDishForm.jsx';
import DishControlForm from '../admin/DishControlForm.jsx';

class GoodList extends Component {
  constructor() {
    super();
    this.state = {
      currentDish: {}
    };
    this.submitAddDishForm = this.submitAddDishForm.bind(this);
    this.getTileOptions = this.getTileOptions.bind(this);
  }
  openAddDishModal(currentDish) {
    this.setState({ currentDish });
    this.refs.addDishModal.toggle();
  }
  openEditDishModal(currentDish) {
    this.setState({ currentDish });
    this.refs.editDishModal.toggle();
  }
  submitAddDishForm() {
    const { onSelect } = this.props;
    const { addDishModal, addDishForm } = this.refs;
    const values = addDishForm.getSelected();
    onSelect(values);
    addDishModal.toggle();
  }
  renderTiles() {
    const { items } = this.props;
    return items.map(item => <Tile {...this.getTileOptions(item)} />);
  }
  getTileOptions(item) {
    const { auth } = this.props;
    let options = { key: item.id, item, onClick: () => this.openAddDishModal(item) };
    if (auth.isAdmin()) {
      options.withOptionsBtn = true;
      options.onOptionsBtnClick= () => this.openEditDishModal(item);
    }
    return options;
  }
  render() {
    const { selected, editDish, removeDish } = this.props;
    const { currentDish } = this.state;
    const model = selected.find(x => x.id === currentDish.id);
    const tiles = this.renderTiles();
    return (
      <div>
        <ControlledModal ref="addDishModal" onSubmit={this.submitAddDishForm} title="Добавить в корзину">
          <AddDishForm
            ref="addDishForm"
            model={model ? model : currentDish}
          />
        </ControlledModal>
        <ControlledModal ref="editDishModal" title="Редактировать" closeOnSubmit>
          <DishControlForm
            formId="editDishModal"
            initialValues={ currentDish }
            onSubmit={editDish}
            onRemove={removeDish}
          />
        </ControlledModal>
        { tiles }
      </div>
    );
  }
}

export default GoodList;

