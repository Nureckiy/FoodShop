import { RequestHelper } from './apiConnector';

class service {

  constructor() {
    this.requestHelper = new RequestHelper();
  }

  getRoomCategories(success, failed) {
      return this.requestHelper.getWithAjax('roomCategory', success, failed);
  }

  getRoomCategoryById(data, success, failed) {
    return this.requestHelper.getWithAjax(`roomCategory/${data}`, success, failed);
  }

  getRooms(data, success, failed) {
    return this.requestHelper.postWithAjax('room/', data, success, failed);
  }

  checkRoomAvailability(data, success, failed) {
    return this.requestHelper.postWithAjax('room/checkAvailability', data, success, failed);
  }

  book(data, success, failed) {
    return this.requestHelper.postWithAjax('room/book', data, success, failed);
  }

  getPopularDishes = (data, success, failed) => {
    return this.requestHelper.getWithAjax(`dish/popular/${data}`, success, failed);
  };

  getDishesByCategoryName = (data, success, failed) => {
    return this.requestHelper.getWithAjax(`dish/${data}`, success, failed);
  };

  addOrder(data, success, failed) {
    return this.requestHelper.postWithAjax('order', data, success, failed);
  }

  getAvailableAddresses(success, failed) {
    return this.requestHelper.getWithAjax('room/active', success, failed);
  }

  getBookings(success, failed) {
    return this.requestHelper.getWithAjax('room/bookings', success, failed);
  }

  getOrders(success, failed) {
    return this.requestHelper.getWithAjax('order', success, failed);
  }

  sendFeedback(data, success, failed) {
    return this.requestHelper.postWithAjax('feedback', data, success, failed);
  }

  addDish(data, success, failed) {
    return this.requestHelper.postWithAjax('dish', data, success, failed);
  }




  getAllSubscriptions(success, failed) {
    return this.requestHelper.getWithAjax('user/getAllSubscriptions', '', success, failed);
  }

  saveUserSubscriptions(data, success, failed) {
    return this.requestHelper.postWithAjax('user/setSubscriptions', data, success, failed);
  }

  publishSubscriptions(data, success, failed) {
    return this.requestHelper.postWithAjax('user/publishSubscriptions', data, success, failed);
  }





  updateUser(data, success, fail) {
    return this.requestHelper.patchToExternal(`https://${data.domain}/api/v2/users/${data.userId}`, data.data, success, fail);
  }









}

export default new service();