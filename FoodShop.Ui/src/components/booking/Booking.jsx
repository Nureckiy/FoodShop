import React, { Component } from 'react';

import RoomTile from '../common/RoomTile.jsx';
import RoomTileControl from './RoomTileControl.jsx';
import RoomTileWithEditControl from '../admin/RoomTileWithEditControl.jsx';
import Header from '../layout/Header.jsx';
import Loader from '../common/Loader.jsx';
import Slider from '../common/Slider.jsx';
import AddTile from '../admin/AddTile.jsx';
import ControlledModal from '../common/ControlledModal.jsx';
import RoomControlForm from '../admin/RoomControlForm.jsx';
import DateRangePicker from '../common/DateRangePicker.jsx';
import BookingTotal from './BookingTotal.jsx';

class Booking extends Component {
  constructor(){
    super();
    this.state = {};
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filter = this.filter.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
  }
  componentWillMount() {
    const { getRoomCategory, id } = this.props;
    getRoomCategory(id);
    this.filter();
  }
  filter() {
    const { getRooms, id } = this.props;
    const { arrivalDate, departureDate } = this.state;
    getRooms(id, arrivalDate, departureDate);
  }
  handleFilterChange(arrivalDate, departureDate) {
    this.setState({ arrivalDate, departureDate });
  }
  openAddModal() {
    this.refs.addRoomModal.toggle();
  }
  render() {
    const { currentRoomCategory, filteredRooms, getRoomCategoriesInfo, roomCategoriesInfo, activeRequestStatus,
      selectedRooms, removeRoom, addRoom, createRoom, editRoom, auth } = this.props;
    return (
      <div>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/fon4_dg32ge.jpg"
          className="cut"
        />
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
          </div>
          <ControlledModal ref="addRoomModal" title="Добавить новую комнату" onSubmit={this.openAddModal}>
            <RoomControlForm
              onSubmit={createRoom}
              loadCategories={getRoomCategoriesInfo}
              categories={roomCategoriesInfo}
              defaultCategory={currentRoomCategory}
              formId="createRoomForm"/>
          </ControlledModal>
          { auth.isAdmin() &&
          <AddTile onClick={this.openAddModal} />
          }
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
            { activeRequestStatus
              ? <Loader />
              : filteredRooms.map(room =>
                <div key={room.id} className="row sample">
                  <RoomTile {...room} className="col-md-9 col-sm-12" />
                  { auth.isAdmin()
                    ? <RoomTileWithEditControl
                        room={room}
                        onSubmit={addRoom}
                        onEdit={editRoom}
                        loadCategories={getRoomCategoriesInfo}
                        categories={roomCategoriesInfo}
                        className="col-md-3 col-sm-4 date-form" />
                    : <RoomTileControl
                      room={room}
                      onSubmit={addRoom}
                      className="col-md-3 col-sm-4 date-form"/>
                  }
                </div>
              )
            }
          <div className="row">
            <BookingTotal selected={selectedRooms} onRemove={removeRoom} />
          </div>
        </div>
      </div>
    );
  }
}

export default Booking;