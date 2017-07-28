import React, { Component } from 'react';
import { Form, Panel, Button } from 'react-bootstrap';

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
    onSubmit(Object.assign(room, { arrivalDate, departureDate }));
  }
  handleDateChange(arrivalDate, departureDate){
    this.setState({ arrivalDate, departureDate });
  }
  render() {
    const { className, room: { error } } = this.props;
    return (
      <Form className={className} onSubmit={this.handleSubmit}>
        <Button type="submit" className="btn btn-success col-sm-12">Добавить</Button>
        <DateRangePicker onChange={this.handleDateChange} />
        <Panel className="col-sm-12 error-message" collapsible expanded={!!error}>
          {error && <p>{ error.message }</p>}
        </Panel>
      </Form>
    );
  }
}

export default RoomTileControl;