/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import Booking from './Booking.jsx';
import Header from '../layout/Header.jsx';
import Loader from '../common/Loader.jsx';
import Tile from '../common/Tile.jsx';
import history from '../../store/History';

class Rooms extends Component {
  componentWillMount() {
    const { getRoomCategories } = this.props;
    getRoomCategories();
  }
  renderCategories() {
    const { roomCategories } = this.props;
    return roomCategories.map(item =>
      <Tile
        key={item.id}
        item={item}
        onClick={() => history.push(`/booking/${item.id}`)}
        price={`От $${item.minPrice}`}
      />
    );
  }
  render() {
    const { activeRequestStatus } = this.props;
    const tiles = this.renderCategories();
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
            {activeRequestStatus
            ? <Loader />
            : tiles }
          </div>
        </div>
      </div>
    );
  }
}

export default Rooms;