import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import RenderSelect from '../common/RenderSelect';
import * as utils from '../../utils/utils';

class DeliveryDetailsForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleDeliveryClick = this.handleDeliveryClick.bind(this);
  }
  componentWillMount() {
    const { getAvailableAddresses } = this.props;
    getAvailableAddresses();
  }
  getInitialValues() {
    const { surname, phone, name, email } = utils.getProfile().user_metadata;
    return { userName: name, email, surname, phone };
  }
  handleDeliveryClick(event) {
    this.setState({
      hideAddress: event.target.checked
    });
  }
  render() {
    const { onBack, onSubmit, selected, availableAddresses } = this.props;
    const { hideAddress } = this.state;
    const initial = this.getInitialValues();
    const total = utils.calculateSelectedTotal(selected);
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
              id="userName"
              type="text"
              placeholder="Введите имя"
              label="Ваше имя"
              required
            />
            <Field
              id="phone"
              type="text"
              placeholder="Номер телефона"
              label="Телефон"
              pattern="8[0-9]{10}"
              required
            />
            <Field
              id="email"
              type="email"
              placeholder="Email"
              label="Email"
            />
            <Field
              id="takeAway"
              type="checkbox"
              label="Заберу сам"
              onChange={this.handleDeliveryClick} />
          </FormGroup>
          <FormGroup>
            {!hideAddress &&
              <RenderSelect
                id="address"
                type="text"
                label="Доставить в номер"
                options={utils.renderArrayOptions(availableAddresses)}
                defaultEmptyOption
                required
              />
            }
          </FormGroup>
          <div className="col-sm-12 buttons text-center">
            <button className="btn btn-orange">Заказать</button>
            <button type="button" onClick={onBack} className="btn btn-default">Назад</button>
          </div>
        </ControlledForm>
        <ul className="col-md-6 total-list hidden-sm hidden-xs">
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