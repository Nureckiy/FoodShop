import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import Tile from '../common/Tile.jsx';
import AddTile from '../admin/AddTile.jsx';
import ItemMaintenanceModal from '../common/ItemMaintenanceModal.jsx';
import RoomCategoryControlForm from '../admin/RoomCategoryControlForm.jsx';
import history from '../../store/History';
import * as utils from '../../utils/utils';

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: {} };
    const { getRoomCategories } = props;
    getRoomCategories();
    this.getCreateOptions = this.getCreateOptions.bind(this);
    this.getEditOptions = this.getEditOptions.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
  }

  render() {
    const { profile, activeRequestStatus, roomCategories } = this.props;
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/fon4_dg32ge.jpg"
          title="Найдите свой номер у нас!"
          subtitle="ЛУЧШИЙ ОТЕЛЬ ВОСТОЧНОГО ПОБЕРЕЖЬЯ БЕЛАРУСИ"
          className="banner"
        />
        <div className="container content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center title">
              <h2 className="cursive-font primary-color">Доступные номера</h2>
              <p>
                Как первый отель класса четыре лайка в Республике Беларусь, мы достойно держим марку лучшего отеля в сфере гостиничных услуг страны, и совершенствуем формы и методы обслуживания гостей.
              </p>
            </div>
          </div>
          <div className="row">
            <ItemMaintenanceModal ref="roomCategoryControlModal"
                createOptions={this.getCreateOptions()}
                editOptions={this.getEditOptions()} >
              <RoomCategoryControlForm />
            </ItemMaintenanceModal>
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
    const { profile } = this.props;
    let options = { key: item.id, item, price: `От $${item.minPrice}`, className: 'col-md-4 col-sm-6',
      onClick: () => history.push(`/booking/${item.id}`)};
    if(utils.isInGroup(profile, 'admins')) {
      options.withOptionsBtn = true;
      options.onOptionsBtnClick = () => this.openEditModal(item);
    }
    return options;
  }

  getCreateOptions() {
    const { createRoomCategory } = this.props;
    return { formId: 'roomCategoryControl', submitFunctions: { onSubmit: createRoomCategory } };
  }

  getEditOptions() {
    const { editRoomCategory, removeRoomCategory } = this.props;
    const { selected } = this.state;
    return { formId: 'roomCategoryControl', initial: selected, submitFunctions: { onSubmit: editRoomCategory,
        onRemove: removeRoomCategory,
    }};
  }

  openCreateModal() {
    this.refs.roomCategoryControlModal.openInCreateMode();
  }

  openEditModal(selected) {
    this.setState({ selected });
    this.refs.roomCategoryControlModal.openInEditMode();
  }
}

export default Rooms;