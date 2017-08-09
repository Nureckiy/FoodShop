import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import RoomTile from '../common/RoomTile.jsx';
import RoomTileControl from './RoomTileControl.jsx';
import Header from '../layout/Header.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';
import Slider from '../common/Slider.jsx';
import ItemMaintenanceModal from '../common/ItemMaintenanceModal.jsx';
import RoomControlForm from '../admin/RoomControlForm.jsx';
import DateRangePicker from '../common/DateRangePicker.jsx';
import BookingTotal from './BookingTotal.jsx';
import * as utils from '../../utils/utils';

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
    const { currentRoomCategory, filteredRooms, activeRequestStatus, selectedRooms, addRoom, profile, deleteRoom } = this.props;
    const isInGroup = group => utils.isInGroup(profile, group);
    return (
      <div>
        <Header backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/fon4_dg32ge.jpg" />
        <div className="container content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <Slider images={currentRoomCategory.images} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h3>Описание номера:</h3>
              <p>{currentRoomCategory.description}</p>
              <b>Цена: <span className="cursive-font">от ${currentRoomCategory.minPrice}</span></b>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-md-offset-3 text-center bottom-indent">
              <div className="date-form">
                <DateRangePicker className="col-md-7 date-form" onChange={this.handleFilterChange}/>
              </div>
              <div className="date-form">
                <button type="button" className="btn btn-orange" onClick={this.filter}>Найти номер</button>
              </div>
            </div>
          </div>
          { isInGroup('admins') &&
            <Button bsStyle="success" onClick={() => this.refs.roomControlModal.openInCreateMode()}>
              <Glyphicon glyph="plus"/>   Добавить
            </Button>
          }
          <LoadingComponent showLoader={activeRequestStatus}>
            <div className="row sample">
              { filteredRooms.map(room =>
                <div key={room.id} className="top-indent">
                  <RoomTile {...room} className="col-md-8 col-sm-12 no-padding" />
                  <RoomTileControl
                    room={room}
                    onSubmit={addRoom}
                    className="col-md-4 col-sm-5"
                    withEditButton={isInGroup('admins')}
                    onEdit={() => this.openEditModal(room)}
                  />
                </div>
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
    return { formId: 'roomControl', loadCategories: getRoomCategoriesInfo, categories: roomCategoriesInfo,
      submitFunctions: { onSubmit: (values) => createRoom(values, currentRoomCategory) }, defaultCategory: currentRoomCategory
    };
  }

  getEditOptions() {
    const { editRoom, removeRoom, currentRoomCategory } = this.props;
    const { selected } = this.state;
    return {...this.getCreateOptions(), initial: selected, submitFunctions: {
      onSubmit: (values) => editRoom(values, currentRoomCategory), onRemove: removeRoom
    }};
  }

  openEditModal(selected) {
    this.setState({ selected });
    this.refs.roomControlModal.openInEditMode();
  }
}

export default Booking;