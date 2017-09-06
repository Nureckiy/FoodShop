import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import Tile from '../common/Tile.jsx';
import AddTile from '../admin/AddTile.jsx';
import ResponsiveActionModal from '../common/ResponsiveActionModal.jsx';
import RoomCategoryControlForm from '../admin/RoomCategoryControlForm.jsx';
import history from '../../store/History';
import * as utils from '../../utils/utils';

class RoomCategories extends Component {
  constructor() {
    super();
    this.state = {};
    this.openCreateModal = this.openCreateModal.bind(this);
    this.getSubmitFunctions = this.getSubmitFunctions.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.getRoomCategories();
  }

  render() {
    const { showModal, selected, isInEditMode } = this.state;
    const { profile, activeRequestStatus, roomCategories, translate } = this.props;
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/fon4_dg32ge.jpg"
          title={translate('titleRoomCategories')}
          subtitle={translate('subtitle')}
          big
        />
        <div className="container content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center title">
              <h2 className="cursive-font primary-color">{translate('availableRooms')}</h2>
              <p>{translate('roomCategoriesTitle')}</p>
            </div>
          </div>
          <div className="row">
            <ResponsiveActionModal
              show={showModal}
              close={this.closeModal}
              responsiveActions={this.getSubmitFunctions()}
              title={isInEditMode ? translate('edit'): translate('create')}
              translate={translate}>
              <RoomCategoryControlForm
                formId="roomCategoryControl"
                initial={isInEditMode ? selected : {}}
                translate={translate} />
            </ResponsiveActionModal>
          </div>
          <LoadingComponent showLoader={activeRequestStatus}>
            <div className="row tiles">
              { utils.isInGroup(profile, 'admins') &&
                <AddTile className="col-md-4 col-sm-6" onClick={this.openCreateModal} />
              }
              { roomCategories && roomCategories.map(item => <Tile {...this.getTileOptions(item)} /> )}
            </div>
          </LoadingComponent>
        </div>
      </div>
    );
  }

  getTileOptions(item) {
    const { profile, translate } = this.props;
    let options = { key: item.id, item, price: `${translate('from')} $${item.minPrice}`, className: 'col-md-4 col-sm-6',
      onClick: () => history.push(`/booking/${item.id}`)};
    if(utils.isInGroup(profile, 'admins')) {
      options.withOptionsBtn = true;
      options.onOptionsBtnClick = () => this.openEditModal(item);
    }
    return options;
  }

  getSubmitFunctions() {
    const { isInEditMode } = this.state;
    const { createRoomCategory, editRoomCategory, removeRoomCategory } = this.props;
    if (isInEditMode) {
      return { onSubmit: editRoomCategory, onRemove: removeRoomCategory };
    }
    return { onSubmit: createRoomCategory };
  }

  openCreateModal() {
    this.setState({ showModal: true, isInEditMode: false });
  }

  openEditModal(selected) {
    this.setState({ showModal: true, isInEditMode: true, selected });
  }

  closeModal() {
    this.setState({ showModal: false });
  }
}

export default RoomCategories;