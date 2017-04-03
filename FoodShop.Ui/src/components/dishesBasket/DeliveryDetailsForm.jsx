import React, { Component } from 'react';
import * as utils from '../../utils/utils';
import Field from '../common/Field.jsx';
import { FormGroup } from 'react-bootstrap';
import ControlledForm from '../common/ControlledForm.jsx';

class DeliveryDetailsForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleDeliveryClick = this.handleDeliveryClick.bind(this);
  }
  getDefault() {
    const name = utils.getProfileItem('name');
    const phoneNumber = utils.getProfileItemFromMetadata('phoneNumber');
    const address = utils.getProfileItemFromMetadata('address');
    return { name, phoneNumber, address };
  }
  handleDeliveryClick(event) {
    this.setState({
      hideAddress: event.target.checked
    });
  }
  render() {
    const { onBack, onSubmit, selected } = this.props;
    const { hideAddress } = this.state;
    const initial = this.getDefault();
    const total = utils.calculateGoodTotal(selected);
    return (
      <div className="row animate-box">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h2 className="cursive-font primary-color">Корзина</h2>
          </div>
        </div>
        <div className="row">
        <ControlledForm onSubmit={onSubmit} initialValues={initial} className="col-md-6">
          <FormGroup>
            <Field
              id="name"
              type="text"
              placeholder="Введите имя"
              label="Ваше имя"
              required
            />
            <Field
              id="phoneNumber"
              type="text"
              placeholder="Номер телефона"
              label="Телефон"
              pattern="8[0-9]{10}"
              required
            />
            <h3 className="adress-header">Способ доставки</h3>
            <input type="checkbox" id="take_away" onChange={this.handleDeliveryClick} />
            <label htmlFor="take_away" className="check-label black" id="samLabel"><span></span>Самовывоз</label>
          </FormGroup>
          <FormGroup>
            {!hideAddress &&
              <Field
                id="address"
                type="text"
                placeholder="Введите адрес"
                label="Адрес доставки"
                required
              />
            }
          </FormGroup>
          <div className="col-md-12 buttons">
            <input type="submit" value="Заказать" className="btn btn-warning" />
            <input type="button" value="Отменить" className="btn btn-default" onClick={onBack} />
          </div>
        </ControlledForm>
        <ul className="col-md-6">
        { selected.map(item =>
          <li key={item.id}>{item.name}</li>
        )}
        <b className="black">Итого: {total.toFixed(2)}</b>
        </ul>
      </div>
      </div>
    );
  }
}

export default DeliveryDetailsForm;