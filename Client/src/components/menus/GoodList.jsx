import React, { Component } from 'react';

import ItemMaintenanceModal from '../common/ItemMaintenanceModal.jsx';
import Tile from '../common/Tile.jsx';
import AddTile from '../admin/AddTile.jsx';
import AddDishForm from './AddDishForm.jsx';
import DishControlForm from '../admin/DishControlForm.jsx';

class GoodList extends Component {
  constructor() {
    super();
    this.state = { currentDish: {} };
    this.getCreateOptions = this.getCreateOptions.bind(this);
    this.getEditOptions = this.getEditOptions.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
  }

  render() {
    const { selected, auth, onSelect, items } = this.props;
    const { currentDish, addToOrder } = this.state;
    const model = selected.find(x => x.id === currentDish.id);
    return (
      <div className="row">
        <ItemMaintenanceModal ref="dishControlModal" title={ addToOrder ? 'Добавить в корзину' : false }
            createOptions={this.getCreateOptions()} editOptions={this.getEditOptions()} >
          { addToOrder
            ? <AddDishForm
                model={model ? model : currentDish}
                onSubmit={this.modalSubmit(onSelect)}
                formId="addDishForm" />
            : <DishControlForm />
          }
        </ItemMaintenanceModal>
        <div className="col-xs-12 tiles">
          { auth.isAdmin() &&
            <AddTile onClick={this.openCreateModal} className="col-md-4 col-sm-6" />
          }
          { items.map(item =>
            <Tile
              key={item.id}
              item={item}
              onClick={() => this.openAddDishModal(item)}
              withOptionsBtn={auth.isAdmin()}
              onOptionsBtnClick={() => this.openEditModal(item)}
              className="col-md-4 col-sm-6" />
          )}
        </div>
      </div>
    );
  }

  getCreateOptions() {
    const { onCreate, defaultCategory } = this.props;
    return { formId: 'dishControl',  defaultCategory, onSubmit: this.modalSubmit(onCreate, defaultCategory) };
  }

  getEditOptions() {
    return Object.assign(this.getCreateOptions(), {
      initialValues: this.state.currentDish,
      onSubmit: this.modalSubmit(this.props.editDish, this.props.defaultCategory),
      onRemove: this.modalSubmit(this.props.removeDish)
    });
  }

  openAddDishModal(currentDish) {
    this.setState({ currentDish,  addToOrder: true });
    this.refs.dishControlModal.toggle();
  }

  openEditModal(currentDish) {
    this.setState({ currentDish, addToOrder: false });
    this.refs.dishControlModal.openInEditMode();
  }

  openCreateModal() {
    this.setState({ addToOrder: false });
    this.refs.dishControlModal.openInCreateMode();
  }

  modalSubmit(action, category) {
    return values => {
      action(values, category);
      this.refs.dishControlModal.toggle();
    };
  }
}

export default GoodList;