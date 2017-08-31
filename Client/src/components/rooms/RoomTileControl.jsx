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
    const { className, room: { error }, withEditButton, onEdit, translate } = this.props;
    const errorMsg = error ? error.message : this.state.error;
    return (
      <Form className={className} onSubmit={this.handleSubmit}>
        { withEditButton &&
          <Button type="button" className="btn btn-success col-sm-12" onClick={onEdit}>{translate('edit')}</Button>
        }
        <Button type="submit" className="btn btn-success col-sm-12">{translate('add')}</Button>
        <DateRangePicker onChange={this.handleDateChange} />
        <Panel className="col-sm-12 error-message" collapsible expanded={!!errorMsg}>
          {errorMsg && <p>{ errorMsg }</p>}
        </Panel>
      </Form>
    );
  }

  handleSubmit(e){
    e.preventDefault();
    const { onSubmit, room, translate } = this.props;
    const { arrivalDate, departureDate } = this.state;
    const isCorrect = isCorrectRange([arrivalDate, departureDate]);
    if (isCorrect) {
      onSubmit(Object.assign(room, { arrivalDate, departureDate }));
    } else {
      this.setState({ error: translate('wrongRange') });
    }
  }

  handleDateChange(arrivalDate, departureDate){
    this.setState({ arrivalDate, departureDate });
  }
}

function isCorrectRange(params) {
  return params.every(e => e);
}

export default RoomTileControl;