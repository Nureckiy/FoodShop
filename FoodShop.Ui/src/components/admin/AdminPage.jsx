/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import FieldGroup from '../common/FieldGroup.jsx';
import ControlledForm from '../common/ControlledForm.jsx';
import { Form, FormGroup } from 'react-bootstrap';

class AdminPage extends Component {
  componentWillMount() {
    const { getAllSubscriptions } = this.props.actions;
    getAllSubscriptions();
  }
  handleSubmit(selected) {
    const { publishSubscriptions } = this.props.actions;
    publishSubscriptions(Object.keys(selected));
  }
  render() {
    const { subscriptions } = this.props;
    return (
      <span>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg"
          className="cut"
        />
        <div className="container content">
          <div className="row">
            <div className="well admin-section">
              <Form className="subscriptions-list">
                <ControlledForm onSubmit={this.handleSubmit.bind(this)}>
                  <FormGroup bsClass="col-md-8">
                    { subscriptions.map(item =>
                      <FieldGroup
                        key={item.Id}
                        id={item.Id}
                        type="checkbox"
                        label={item.Name}
                        labelClass="gray"
                      />
                    )}
                  </FormGroup>
                  <div className="col-md-4 subscribe">
                    <button type="submit" className="btn btn-warning">Опубликовать</button>
                  </div>
                </ControlledForm>
              </Form>
            </div>
          </div>
        </div>
      </span>
    );
  }
}

export default AdminPage;