import React, { Component } from 'react';

import ControlledModal from '../common/ControlledModal.jsx';
import Tile from '../common/Tile.jsx';
import AddDishForm from './AddDishForm.jsx';

class GoodList extends Component {
  constructor() {
    super();
    this.state = {
      currentDish: {}
    };
    this.submitDishForm = this.submitDishForm.bind(this);
  }
  openModal(item) {
    this.setState({
      currentDish: item
    });
    this.refs.addDishModal.toggle();
  }
  submitDishForm() {
    const { onSelect } = this.props;
    const { addDishModal, addDishForm } = this.refs;
    const values = addDishForm.getSelected();
    onSelect(values);
    addDishModal.toggle();
  }
  render() {
    const { selected, items } = this.props;
    const { currentDish } = this.state;
    const model = selected.find(x => x.id === currentDish.id);
    return (
      <div className="row">
        <ControlledModal ref="addDishModal" onSubmit={this.submitDishForm} title="Добавить в корзину">
          <AddDishForm
            ref="addDishForm"
            model={model ? model : currentDish}
          />
        </ControlledModal>
        {items.map(item =>
          <Tile key={item.id} item={item} onClick={() => this.openModal(item)} />
        )}
      </div>
    );
  }
}

export default GoodList;