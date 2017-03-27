/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import { FormGroup, Form } from 'react-bootstrap';
import ControlledForm from '../common/ControlledForm.jsx';
import Field from '../common/Field.jsx';

class SubscriptionManagement extends Component {
  constructor(props) {
    super(props);
    const { getAllSubscriptions } = props;
    getAllSubscriptions();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { onSave } = this.props;
    const selected = [];
    Object.keys(values).forEach(key => {
      if (values[key]) {
        selected.push(key);
      }
    });
    onSave(selected);
  }
  render() {
    const { subscriptions, userSubscriptions } = this.props;
    let initial = {};
    userSubscriptions.map(item => initial[item.Id] = true );
    return (
      <div className="well subscriptions-manage-form col-sm-12">
        <ControlledForm initialValues={initial} onSubmit={this.handleSubmit}>
          <FormGroup bsClass="col-md-8">
            {subscriptions.map(item =>
              <Field
                key={item.Id}
                id={item.Id}
                type="checkbox"
                label={item.Name}
              />
            )}
          </FormGroup>
          <div className="col-md-4 subscribe">
            <button type="submit" className="btn btn-warning">Сохранить</button>
          </div>
        </ControlledForm>
      </div>
  );
  }
}

export default SubscriptionManagement;