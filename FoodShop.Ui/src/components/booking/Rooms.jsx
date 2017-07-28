import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import Loader from '../common/Loader.jsx';
import Tile from '../common/Tile.jsx';
import AddTile from '../admin/AddTile.jsx';
import ControlledModal from '../common/ControlledModal.jsx';
import CreateRoomCategoryForm from '../admin/RoomCategoryControlForm.jsx';
import history from '../../store/History';

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: {} };
    const { getRoomCategories } = props;
    getRoomCategories();
  }
  openEditRoomCategoryModal(item) {
    this.setState({ selected: item });
    this.refs.editCategoryModal.toggle();
  }
  render() {
    const { activeRequestStatus, roomCategories, createRoomCategory, editRoomCategory, auth } = this.props;
    const { selected } = this.state;
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
              <h2 className="cursive-font primary-color">
                Доступные номера
              </h2>
              <p>
                Как первый отель класса четыре лайка в Республике Беларусь, мы достойно держим марку лучшего отеля в сфере гостиничных услуг страны, и совершенствуем формы и методы обслуживания гостей.
              </p>
            </div>
          </div>
          <div className="row">
            <ControlledModal ref="addCategoryModal" title="Добавить новый тип номеров" closeOnSubmit>
              <CreateRoomCategoryForm onSubmit={createRoomCategory} formId="createRoomCategoryForm"/>
            </ControlledModal>
            <ControlledModal ref="editCategoryModal" title="Редактировать" closeOnSubmit>
              <CreateRoomCategoryForm
                formId="editRoomCategoryForm"
                initial={selected}
                onSubmit={editRoomCategory} />
            </ControlledModal>
            { auth.isAdmin() &&
              <AddTile onClick={() => this.refs.addCategoryModal.toggle() }/>
            }
            {activeRequestStatus
            ? <Loader />
            : roomCategories && roomCategories.map(item =>
                <Tile
                  key={item.id}
                  item={item}
                  onClick={() => history.push(`/booking/${item.id}`)}
                  price={`От $${item.minPrice}`}
                  withOptionsBtn
                  onOptionsBtnClick={() => this.openEditRoomCategoryModal(item)} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Rooms;