import React, { Component } from 'react';

import RoomTile from '../common/RoomTile.jsx';
import RoomTileControl from './RoomTileControl.jsx';
import Header from '../layout/Header.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import Slider from '../common/Slider.jsx';
import AddTile from '../admin/AddTile.jsx';
import ItemMaintenanceModal from '../common/ItemMaintenanceModal.jsx';
import RoomControlForm from '../admin/RoomControlForm.jsx';
import DateRangePicker from '../common/DateRangePicker.jsx';
import BookingTotal from './BookingTotal.jsx';

class Booking extends Component {
  constructor(){
    super();
    this.state = {};
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filter = this.filter.bind(this);
    this.getCreateOptions = this.getCreateOptions.bind(this);
    this.getEditOptions = this.getEditOptions.bind(this);
  }

  componentWillMount() {
    const { getRoomCategory, id } = this.props;
    getRoomCategory(id);
    this.filter();
  }

  render() {
    const { currentRoomCategory, filteredRooms, activeRequestStatus, selectedRooms, addRoom, auth, deleteRoom } = this.props;
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/fon4_dg32ge.jpg"
          className="cut" />
        <div className="container content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <Slider images={currentRoomCategory.images} />
            </div>
          </div>
          <div className="row">
            <h3>Описание номера:</h3>
            <p>{currentRoomCategory.description}</p>
            <b>Цена: <span className="cursive-font">от ${currentRoomCategory.minPrice}</span></b>
            { auth.isAdmin() &&
              <AddTile onClick={() => this.refs.roomControlModal.openInCreateMode()} />
            }
          </div>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="col-md-7 date-form">
                <DateRangePicker className="col-md-7 date-form" onChange={this.handleFilterChange}/>
              </div>
              <div className="col-md-5 date-form">
                <button type="button" className="btn btn-orange" onClick={this.filter}>Найти номер</button>
              </div>
            </div>
          </div>
          <LoadingComponent showLoader={activeRequestStatus}>
            <div className="row sample">
              { filteredRooms.map(room =>
                <span key={room.id}>
                  <RoomTile {...room} className="col-md-9 col-sm-12" />
                    <RoomTileControl
                      room={room}
                      onSubmit={addRoom}
                      className="col-md-3 col-sm-4 date-form"
                      withEditButton={auth.isAdmin()}
                      onEdit={() => this.openEditModal(room)}
                    />
                </span>
              )}
            </div>
          </LoadingComponent>
          <BookingTotal selected={selectedRooms} onRemove={deleteRoom}/>
        </div>
        <ItemMaintenanceModal ref="roomControlModal"
                              createOptions={this.getCreateOptions()}
                              editOptions={this.getEditOptions()}>
          <RoomControlForm />
        </ItemMaintenanceModal>
      </div>
    );
  }

  filter() {
    const { getRooms, id } = this.props;
    const { arrivalDate, departureDate } = this.state;
    getRooms(id, arrivalDate, departureDate);
  }

  handleFilterChange(arrivalDate, departureDate) {
    this.setState({ arrivalDate, departureDate });
  }

  getCreateOptions() {
    const { createRoom, currentRoomCategory, getRoomCategoriesInfo, roomCategoriesInfo } = this.props;
    return {
      formId: 'roomControl',
      loadCategories: getRoomCategoriesInfo,
      categories: roomCategoriesInfo,
      onSubmit: this.modalSubmit(createRoom),
      defaultCategory: currentRoomCategory
    };
  }

  getEditOptions() {
    const { editRoom, removeRoom } = this.props;
    const { selected } = this.state;
    return Object.assign(this.getCreateOptions(), {
      onSubmit: this.modalSubmit(editRoom),
      onRemove: this.modalSubmit(removeRoom),
      initial: selected
    });
  }

  openEditModal(selected) {
    this.setState({ selected });
    this.refs.roomControlModal.openInEditMode();
  }

  modalSubmit(action) {
    return values => {
      action(values);
      this.refs.roomControlModal.toggle();
    };
  }
}

export default Booking;