/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import { Form, FormGroup } from 'react-bootstrap';
import * as utils from '../../utils/utils';

class SubscriptionManagement extends Component {
  constructor(props) {
    super(props);
    const { getAllSubscriptions, userSubscriptions } = props;
    this.state = {
      selected: userSubscriptions.map(item => item.Id)
    };
    getAllSubscriptions();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(props) {
    const { userSubscriptions } = props;
    if (userSubscriptions !== this.props.userSubscriptions) {
      this.setState({
        selected: userSubscriptions.map(item => item.Id)
      });
    }
  }
  handleInputChange(event) {
    const id = event.target.id;
    const selected = utils.mergeSubstitutions(this.state.selected, id);
    this.setState({ selected });
  }
  handleSubmit() {
    const { selected } = this.state;
    const { onSave } = this.props;
    onSave(selected);
  }
  render() {
    const { subscriptions } = this.props;
    const { selected } = this.state;
    return (
      <div className="well subscriptions-manage-form col-sm-12">
        <Form className="subscriptions-list">
          <FormGroup bsClass="col-md-8">
            { subscriptions.map(item =>
              <span key={item.Id}>
                    <input type="checkbox" id={item.Id} checked={selected.includes(item.Id)} onChange={this.handleInputChange} />
                    <label htmlFor={item.Id} className="check-label gray" id="samLabel"><span></span>{item.Name}</label>
                  </span>
            )}
          </FormGroup>
          <div className="col-md-4 subscribe">
            <button type="button" className="btn btn-warning" onClick={this.handleSubmit} >Сохранить</button>
          </div>
        </Form>
      </div>
  );
  }
}

export default SubscriptionManagement;