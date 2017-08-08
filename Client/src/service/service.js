import { RequestHelper } from './apiConnector';

class service {

  constructor() {
    this.requestHelper = new RequestHelper();
  }

  getRoomCategories = (success, failed) => {
      return this.requestHelper.getWithAjax('roomCategory', '', success, failed);
  };

  getRoomCategoriesInfo = (success, failed) => {
    return this.requestHelper.getWithAjax('roomCategory/inStock', '', success, failed);
  };

  getRoomCategoryById = (data, success, failed) => {
    return this.requestHelper.getWithAjax(`roomCategory/${data}`, '', success, failed);
  };

  addRoomCategory = (data, success, failed) => {
    return this.requestHelper.postWithAjax('roomCategory', data, success, failed);
  };

  editRoomCategory = (data, success, failed) => {
    return this.requestHelper.putWithAjax('roomCategory', data, success, failed);
  };

  removeRoomCategory = (data, success, failed) => {
    return this.requestHelper.deleteWithAjax(`roomCategory/${data}`, '', success, failed);
  };

  getRooms = (data, success, failed) => {
    return this.requestHelper.getWithAjax('room', data, success, failed);
  };

  addRoom = (data, success, failed) => {
    return this.requestHelper.postWithAjax('room', data, success, failed);
  };

  editRoom = (data, success, failed) => {
    return this.requestHelper.putWithAjax('room', data, success, failed);
  };

  removeRoom = (data, success, failed) => {
    return this.requestHelper.deleteWithAjax(`room/${data}`, '', success, failed);
  };

  checkRoomAvailability = (data, success, failed) => {
    return this.requestHelper.postWithAjax('room/checkAvailability', data, success, failed);
  };

  book = (data, success, failed) => {
    return this.requestHelper.postWithAjax('room/book', data, success, failed);
  };

  getPopularDishes = (data, success, failed) => {
    return this.requestHelper.getWithAjax(`dish/popular/${data}`, '', success, failed);
  };

  getAvailableAddresses = (success, failed) => {
    return this.requestHelper.getWithAjax('room/active', '', success, failed);
  };

  getDishesByCategoryName = (data, success, failed) => {
    return this.requestHelper.getWithAjax(`dish/${data}`, '', success, failed);
  };

  addDish = (data, success, failed) => {
    return this.requestHelper.postWithAjax('dish', data, success, failed);
  };

  editDish = (data, success, failed) => {
    return this.requestHelper.putWithAjax('dish', data, success, failed);
  };

  removeDish = (data, success, failed) => {
    return this.requestHelper.deleteWithAjax(`dish/${data}`, '', success, failed);
  };

  addOrder = (data, success, failed) => {
    return this.requestHelper.postWithAjax('order', data, success, failed);
  };

  getBookings = (success, failed) => {
    return this.requestHelper.getWithAjax('room/bookings', '', success, failed);
  };

  getOrders = (success, failed) => {
    return this.requestHelper.getWithAjax('order', '', success, failed);
  };

  sendFeedback = (data, success, failed) => {
    return this.requestHelper.postWithAjax('feedback', data, success, failed);
  };

  updateUser = (data, success, fail) => {
    return this.requestHelper.patchToExternal(`https://${data.domain}/api/v2/users/${data.userId}`, data.data, success, fail);
  };

  getAllBookings = (success, failed) => {
    return this.requestHelper.getWithAjax('room/allBookings', '', success, failed);
  };

  changeBookingStatus = (data, success, failed) => {
    return this.requestHelper.putWithAjax('room/bookingStatus', data, success, failed);
  };
}

export default new service();