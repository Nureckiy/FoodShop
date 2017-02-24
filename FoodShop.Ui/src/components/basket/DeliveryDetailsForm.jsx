/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import * as utils from '../../utils/utils';
import FieldGroup from '../common/FieldGroup.jsx';
import { Form, FormGroup } from 'react-bootstrap';

class DeliveryDetailsForm extends Component {
  constructor() {
    super();
    this.state = this.getDefault();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getDefault() {
    const name = utils.getProfileItem('name');
    const phone = utils.getProfileItemFromMetadata('phone');
    const address = utils.getProfileItemFromMetadata('address');
    return { name, phone, address };
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;
    this.setState({
      [name]: value
    });
  }
  handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }
  render() {
    const { onBack } = this.props;
    return (
      <div className="row animate-box">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h2 className="cursive-font primary-color">Корзина</h2>
          </div>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <div className="row">
            <FormGroup bsClass="col-md-4">
              <FieldGroup
                id="name"
                type="text"
                placeholder="Введите имя"
                label="Ваше имя"
                value={this.state.name}
                onChange={this.handleInputChange}
                required
              />
              <FieldGroup
                id="phone"
                type="text"
                placeholder="Номер телефона"
                label="Телефон"
                value={this.state.phone}
                onChange={this.handleInputChange}
                pattern="8[0-9]{10}"
                required
              />
              <h3 className="adress-header">Способ доставки</h3>
              <input type="checkbox" id="take_away" onChange={this.handleInputChange} />
              <label htmlFor="take_away" className="check-label" id="samLabel" style={{color: '#000'}}><span></span>Самовывоз</label>
            </FormGroup>
            <FormGroup className="col-md-12">
                {!this.state.take_away &&
                  <FieldGroup
                    id="address"
                    type="text"
                    placeholder="Введите адрес"
                    label="Адрес доставки"
                    value={this.state.address}
                    onChange={this.handleInputChange}
                    required
                  />
                }
            </FormGroup>
          </div>
          <div className="col-md-12 buttons">
            <input type="submit" value="Заказать" className="btn btn-warning" />
            <input value="Назад" className="btn btn-defult" onClick={onBack} />
          </div>
        </Form>
      </div>
    );
  }
}

export default DeliveryDetailsForm;