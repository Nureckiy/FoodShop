import React, { Component } from 'react';

import ResponsiveActionModal from '../common/ResponsiveActionModal.jsx';
import Tile from '../common/Tile.jsx';
import AddTile from '../admin/AddTile.jsx';
import AddDishForm from './AddDishForm.jsx';
import DishControlForm from '../admin/DishControlForm.jsx';
import * as utils from '../../utils/utils';

class DishesList extends Component {
  constructor() {
    super();
    this.state = { currentDish: {} };
    this.openCreateModal = this.openCreateModal.bind(this);
    this.handleDishSelect = this.handleDishSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    const { selected, profile, items, defaultCategory, translate } = this.props;
    const { currentDish, addToOrder, isInEditMode, showModal } = this.state;
    const model = selected.find(x => x.id === currentDish.id);
    return (
      <div className="row">
        <ResponsiveActionModal
          show={showModal}
          close={this.closeModal}
          responsiveActions={this.getSubmitActions()}
          title={isInEditMode ? translate('edit'): translate('add')}
          translate={translate}>
          { addToOrder
            ? <AddDishForm
                formId="addDishForm"
                model={model ? model : currentDish}
                onSubmit={this.handleDishSelect}
                translate={translate}/>
            : <DishControlForm
                formId="dishControl"
                defaultCategory={defaultCategory}
                initialValues={isInEditMode ? currentDish : {}}
                translate={translate}/>
          }
        </ResponsiveActionModal>
        <div className="col-xs-12 tiles">
          { utils.isInGroup(profile, 'admins') &&
            <AddTile onClick={this.openCreateModal} className="col-md-4 col-sm-6" />
          }
          { items.map(item =>
            <Tile
              key={item.id}
              item={item}
              onClick={() => this.openAddDishModal(item)}
              withOptionsBtn={utils.isInGroup(profile, 'admins')}
              onOptionsBtnClick={() => this.openEditModal(item)}
              className="col-md-4 col-sm-6" />
          )}
        </div>
      </div>
    );
  }

  getSubmitActions() {
    const { addToOrder, isInEditMode } = this.state;
    const { editDish, defaultCategory, removeDish, onCreate } = this.props;
    if (addToOrder) return {};
    if (isInEditMode) return { onSubmit: (values) => editDish(values, defaultCategory), onRemove: removeDish };
    return { onSubmit: (values) => onCreate(values, defaultCategory) };
  }

  openAddDishModal(currentDish) {
    this.setState({ currentDish,  addToOrder: true, showModal: true });
  }

  openEditModal(currentDish) {
    this.setState({ currentDish, addToOrder: false, showModal: true, isInEditMode: true });
  }

  openCreateModal() {
    this.setState({ addToOrder: false, showModal: true, isInEditMode: false });
  }

  handleDishSelect(value) {
    this.props.onSelect(value);
    this.closeModal();
  }

  closeModal() {
    this.setState({ showModal: false });
  }
}

export default DishesList;