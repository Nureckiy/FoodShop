import React, { Component } from 'react';
import * as utils from '../../utils/utils';
import FieldGroup from '../common/FieldGroup.jsx';
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
    const phone = utils.getProfileItemFromMetadata('phoneNumber');
    const address = utils.getProfileItemFromMetadata('address');
    return { name, phone, address };
  }
  handleDeliveryClick(event) {
    this.setState({
      hideAddress: event.target.checked
    });
  }
  render() {
    const { onBack, onSubmit } = this.props;
    const { hideAddress } = this.state;
    const initial = this.getDefault();
    return (
      <div className="row animate-box">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h2 className="cursive-font primary-color">Корзина</h2>
          </div>
        </div>
        <ControlledForm onSubmit={onSubmit} initialValues={initial} className="row">
          <FormGroup bsClass="col-md-4">
            <FieldGroup
              id="name"
              type="text"
              placeholder="Введите имя"
              label="Ваше имя"
              required
            />
            <FieldGroup
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
          <FormGroup className="col-md-12">
            {!hideAddress &&
              <FieldGroup
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
            <input value="Назад" className="btn btn-defult" onClick={onBack} />
          </div>
        </ControlledForm>
      </div>
    );
  }
}

export default DeliveryDetailsForm;