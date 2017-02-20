import { RequestHelper } from './apiConnector';

class service {
  constructor() {
    this.requestHelper = new RequestHelper();
  }

  getGoodsByCategoryId = (data, success, failed) => {
    return this.requestHelper.getWithAjax('Good/getGoodsByCategoryId', data, success, failed);
  };

  getPopularGoods = (data, success, failed) => {
    return this.requestHelper.getWithAjax('Good/getPopularGoods', '', success, failed);
  };

  getGoodsByCategoryName = (data, success, failed) => {
    return this.requestHelper.getWithAjax('Good/getGoodsByCategoryName', data, success, failed);
  };

  getTotal(data, success, failed) {
    return this.requestHelper.postWithAjax('Basket/CountTotal', data, success, failed);
  }

  sendFeedback(data, success, failed) {
    return this.requestHelper.postWithAjax('Contacts/sendFeedback', data, success, failed);
  }

  getSubstitutions(data, success, failed) {
    return this.requestHelper.postWithAjax('Substitutions/getSubstitutions', data, success, failed);
  }

  updateUser(data, success, fail) {
    return this.requestHelper.patchToExternal(`https://${data.domain}/api/v2/users/${data.userId}`, data.data, success, fail);
  }
}


export default new service();