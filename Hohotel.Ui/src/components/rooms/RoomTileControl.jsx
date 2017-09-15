import React, { Component } from 'react';
import { Form, Panel, Button } from 'react-bootstrap';

import DateRangePicker from '../common/DateRangePicker.jsx';
import LoadingComponent from '../common/LoadingComponent.jsx';

class RoomTileControl extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);
  }

  render() {
    const { className, withEditButton, onEdit, translate } = this.props;
    const { requestIsSending, error } = this.state;
    return (
      <Form className={className + ' tile-control'} onSubmit={this.handleSubmit}>
        { withEditButton &&
        <Button type="button" bsStyle="success" onClick={onEdit}>{translate('edit')}</Button>
        }
        <Button type="submit" bsStyle="success">{translate('add')}</Button>
        <DateRangePicker onChange={this.handleDateChange} />
        <Panel className="col-sm-12 error-message" collapsible expanded={!!error || requestIsSending}>
          <LoadingComponent small showLoader={requestIsSending}>
            {error && <p>{ error }</p>}
          </LoadingComponent>
        </Panel>
      </Form>
    );
  }

  handleSubmit(e){
    e.preventDefault();
    const {  room, translate } = this.props;
    const { arrivalDate, departureDate } = this.state;
    const isCorrect = isCorrectRange([arrivalDate, departureDate]);
    if (isCorrect)
      this.addRoom(Object.assign(room, { arrivalDate, departureDate }));
    else
      this.setState({ error: translate('wrongRange') });
  }

  addRoom(room) {
    this.toggleLoader();
    this.props.onSubmit(room)
      .then(this.resolve, this.reject)
      .then(this.toggleLoader);
  }

  resolve() {
    this.setState({ error: false });
  }

  reject(error) {
    this.setState({ error: error.message });
  }

  toggleLoader() {
    this.setState((prevState) => {
      return { requestIsSending: !prevState.requestIsSending };
    });
  }

  handleDateChange(arrivalDate, departureDate){
    this.setState({ arrivalDate, departureDate });
  }
}

function isCorrectRange(params) {
  return params.every(e => e);
}

export default RoomTileControl;