import React, { Component } from 'react';

class SubscriptionManagement extends Component {
  render() {
    return (
      <div className="well subscriptions-manage-form col-sm-12">

        <form className="form-inline">
          <div className="col-md-8">
            <input type="checkbox" id="c1" />
            <label htmlFor="c1" className="check-label"><span></span>Холодные блюда</label>

            <input type="checkbox" id="c2" checked />
            <label htmlFor="c2" className="check-label"><span></span>Горячие блюда</label>

            <input type="checkbox" id="c3" checked />
            <label htmlFor="c3" className="check-label"><span></span>Напитки</label>

            <input type="checkbox" id="c4" checked />
            <label htmlFor="c4" className="check-label"><span></span>Фреши</label>

            <input type="checkbox" id="c5" />
            <label htmlFor="c5" className="check-label"><span></span>Вегетарианские блюда</label>
          </div>

          <div className="col-md-4 subscribe">
            <input type="submit" value="Подписаться" className="btn btn-warning"/>
              <input type="submit" value="Отмена" className="btn btn-defult"/>
          </div>
        </form>

      </div>
  );
  }
}

export default SubscriptionManagement;