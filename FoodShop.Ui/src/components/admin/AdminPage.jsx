/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import Header from '../layout/Header.jsx';
import { Form, FormGroup } from 'react-bootstrap';
import * as utils from '../../utils/utils';

class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      selected: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    const { getSubscriptions } = this.props.actions;
    getSubscriptions();
  }
  handleInputChange(event) {
    const id = event.target.id;
    const selected = utils.mergeSubstitutions(this.state.selected, id);
    this.setState({ selected });
  }
  handleSubmit() {
    const { publishSubscription } = this.props.actions;
    const { selected } = this.state;
    publishSubscription(selected);
  }
  render() {
    const { subscriptions } = this.props;
    return (
      <span>
        <Header
          backgroundUrl="http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg"
          className="cut row"
        />
        <div className="container">
          <div className="row">
            <div className="well admin-section">
              <Form className="subscriptions-list">
                <FormGroup bsClass="col-md-8">
                  { subscriptions.map(item =>
                  <span key={item.Id}>
                    <input type="checkbox" id={item.Id} value={this.state[item.Id]} onChange={this.handleInputChange} />
                    <label htmlFor={item.Id} className="check-label gray" id="samLabel"><span></span>{item.Name}</label>
                  </span>
                  )}
                </FormGroup>
                <div className="col-md-4 subscribe">
                  <button type="button" className="btn btn-warning" onClick={this.handleSubmit} >Опубликовать</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </span>
    );
  }
}

export default AdminPage;