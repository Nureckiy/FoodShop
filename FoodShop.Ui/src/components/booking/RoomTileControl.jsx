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

  render() {
    const { className, room: { error }, withEditButton, onEdit } = this.props;
    const errorMsg = error ? error.message : this.state.error;
    return (
      <Form className={className} onSubmit={this.handleSubmit}>
        { withEditButton &&
          <Button type="button" className="btn btn-success col-sm-12" onClick={onEdit}>Редактировать</Button>
        }
        <Button type="submit" className="btn btn-success col-sm-12">Добавить</Button>
        <DateRangePicker onChange={this.handleDateChange} />
        <Panel className="col-sm-12 error-message" collapsible expanded={!!errorMsg}>
          {errorMsg && <p>{ errorMsg }</p>}
        </Panel>
      </Form>
    );
  }

  handleSubmit(e){
    e.preventDefault();
    const { onSubmit, room } = this.props;
    const { arrivalDate, departureDate } = this.state;
    const error = validate([arrivalDate, departureDate]);
    if (error) {
      this.setState({ error });
    } else {
      onSubmit(Object.assign(room, { arrivalDate, departureDate }));
    }
  }

  handleDateChange(arrivalDate, departureDate){
    this.setState({ arrivalDate, departureDate });
  }
}

function validate(params) {
  const allIsNotNull = params.every(e => e);
  if(!allIsNotNull) {
    return 'Указан некорректный промежуток';
  }
}

export default RoomTileControl;