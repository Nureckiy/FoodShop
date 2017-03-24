import React, { Component } from 'react';
import { Form, Panel } from 'react-bootstrap';

import DateRangePicker from '../common/DateRangePicker.jsx';

class RoomTileControl extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    const { onSubmit, room } = this.props;
    const { arrivalDate, departureDate } = this.state;
    const that = this;
    onSubmit(Object.assign({ arrivalDate, departureDate }, room))
      .then(() => that.setState({ error: null }))
      .catch(error => that.setState({ error: error.message }));
  }
  handleDateChange(arrivalDate, departureDate){
    this.setState({ arrivalDate, departureDate });
  }
  render() {
    const { error } = this.state;
    return (
      <Form className="col-md-3 col-sm-4 date-form" onSubmit={this.handleSubmit}>
        <input type="submit" value="Добавить" className="btn btn-success col-sm-12" />
        <DateRangePicker onChange={this.handleDateChange} />
        <Panel className="col-sm-12 error-message" collapsible expanded={!!error}>
          {error && <p>{ error }</p>}
        </Panel>
      </Form>
    );
  }
}

export default RoomTileControl;