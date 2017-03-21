import { RequestHelper } from './apiConnector';

class service {
  constructor() {
    this.requestHelper = new RequestHelper();
  }

  getPopularGoods = (data, success, failed) => {
    return this.requestHelper.getWithAjax('good/getPopular', data, success, failed);
  };

  getGoodsByCategoryName = (data, success, failed) => {
    return this.requestHelper.getWithAjax('good/getByCategoryName', data, success, failed);
  };

  sendFeedback(data, success, failed) {
    return this.requestHelper.postWithAjax('feedback/addFeedback', data, success, failed);
  }

  getSubscriptions(data, success, failed) {
    return this.requestHelper.getWithAjax('user/getSubscriptions', data, success, failed);
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

  getOrders(success, failed) {
    return this.requestHelper.getWithAjax('order/getOrders', '', success, failed);
  }

  addOrder(data, success, failed) {
    return this.requestHelper.postWithAjax('order/addOrder', data, success, failed);
  }

  updateUser(data, success, fail) {
    return this.requestHelper.patchToExternal(`https://${data.domain}/api/v2/users/${data.userId}`, data.data, success, fail);
  }

  getRoomCategories(success, failed) {
    return this.requestHelper.getWithAjax('category/getRoomCategories', '', success, failed);
  }

  getRooms(data, success, failed) {
    return this.requestHelper.getWithAjax('rooms/filterRooms', data, success, failed);
  }

  getRoomCategoryById(data, success, failed) {
    return this.requestHelper.getWithAjax('category/getRoomCategoryById', data, success, failed);
  }

}

export default new service();