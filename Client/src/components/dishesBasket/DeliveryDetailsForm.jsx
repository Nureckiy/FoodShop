import React, { Component } from 'react';
import { FormGroup, Button } from 'react-bootstrap';

import Field from '../common/Field.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import Select from '../common/Select';
import * as utils from '../../utils/utils';

class DeliveryDetailsForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleDeliveryClick = this.handleDeliveryClick.bind(this);
  }

  componentDidMount() {
    const { getAvailableAddresses } = this.props;
    getAvailableAddresses();
  }

  render() {
    const { onBack, onSubmit, selected, availableAddresses, translate } = this.props;
    const { hideAddress } = this.state;
    const total = utils.calculateSelectedTotal(selected);
    return (
      <div className="row animate-box">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h2 className="cursive-font primary-color">{translate('basket')}</h2>
          </div>
        </div>
        <div className="row">
        <ControlledForm onSubmit={onSubmit} initialValues={this.getInitialValues()} className="col-md-6">
          <FormGroup>
            <Field
              id="userName"
              type="text"
              placeholder={translate('enterName')}
              label={translate('name')}
              required
            />
            <Field
              id="phone"
              type="text"
              placeholder={translate('enterPhone')}
              label={translate('phone')}
              pattern="8[0-9]{10}"
              required
            />
            <Field
              id="email"
              type="email"
              placeholder={translate('enterEmail')}
              label={translate('email')}
            />
            <Field
              id="takeAway"
              type="checkbox"
              label={translate('takeAway')}
              onChange={this.handleDeliveryClick} />
          </FormGroup>
          <FormGroup>
            {!hideAddress &&
              <Select
                id="address"
                type="text"
                label={translate('selectRoom')}
                options={utils.renderArrayOptions(availableAddresses)}
                defaultEmptyOption
                required
              />
            }
          </FormGroup>
          <div className="col-sm-12 buttons text-center">
            <Button bsStyle="primary">{translate('toOrder')}</Button>
            <Button type="button" onClick={onBack}>{translate('goBack')}</Button>
          </div>
        </ControlledForm>
        <ul className="col-md-6 total-list hidden-sm hidden-xs">
        { selected.map(item =>
          <li key={item.id}>{item.name}</li>
        )}
        <b className="black">{translate('total')}: {total.toFixed(2)}</b>
        </ul>
      </div>
      </div>
    );
  }

  handleDeliveryClick(event) {
    this.setState({
      hideAddress: event.target.checked
    });
  }

  getInitialValues() {
    const { surname, phone, name, email } = this.props.profile.user_metadata;
    return { userName: name, email, surname, phone };
  }
}

export default DeliveryDetailsForm;