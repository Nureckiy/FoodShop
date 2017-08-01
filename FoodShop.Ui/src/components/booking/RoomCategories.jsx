import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import Tile from '../common/Tile.jsx';
import AddTile from '../admin/AddTile.jsx';
import ItemMaintenanceModal from '../common/ItemMaintenanceModal.jsx';
import RoomCategoryControlForm from '../admin/RoomCategoryControlForm.jsx';
import history from '../../store/History';

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: {} };
    const { getRoomCategories } = props;
    getRoomCategories();
    this.getCreateOptions = this.getCreateOptions.bind(this);
    this.getEditOptions = this.getEditOptions.bind(this);
  }

  render() {
    const { auth, activeRequestStatus, roomCategories } = this.props;
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/fon4_dg32ge.jpg"
          title="Найдите свой номер у нас!"
          subtitle="ЛУЧШИЙ ОТЕЛЬ ВОСТОЧНОГО ПОБЕРЕЖЬЯ БЕЛАРУСИ"
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
            { auth.isAdmin() && <AddTile onClick={() => this.refs.roomCategoryControlModal.openInCreateMode()}/> }
            <LoadingComponent showLoader={activeRequestStatus}>
              <span>{ roomCategories && roomCategories.map(item =>
                  <Tile {...this.getTileOptions(item)} />
                )}
              </span>
            </LoadingComponent>
          </div>
        </div>
      </div>
    );
  }

  getTileOptions(item) {
    const { auth } = this.props;
    let options = { key: item.id, item, price: `От $${item.minPrice}`, onClick: () => history.push(`/booking/${item.id}`)};
    if(auth.isAdmin) {
      options.withOptionsBtn = true;
      options.onOptionsBtnClick = () => this.openEditModal(item);
    }
    return options;
  }

  getCreateOptions() {
    const { createRoomCategory } = this.props;
    return { formId: 'roomCategoryControl', onSubmit: this.modalSubmit(createRoomCategory) };
  }

  getEditOptions() {
    const { editRoomCategory, removeRoomCategory } = this.props;
    const { selected } = this.state;
    return {
      formId: 'roomCategoryControl',
      onSubmit: this.modalSubmit(editRoomCategory),
      onRemove: this.modalSubmit(removeRoomCategory),
      initial: selected
    };
  }

  openEditModal(selected) {
    this.setState({ selected });
    this.refs.roomCategoryControlModal.openInEditMode();
  }

  modalSubmit(action) {
    return values => {
      action(values);
      this.refs.roomCategoryControlModal.toggle();
    };
  }
}

export default Rooms;