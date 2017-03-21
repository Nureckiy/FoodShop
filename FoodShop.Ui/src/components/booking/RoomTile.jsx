/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import DateRangePicker from '../common/DateRangePicker.jsx';
import { Form } from 'react-bootstrap';

class RoomTile extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    const { onSubmit, id, price } = this.props;
    const { startDate, endDate } = this.state;
    const error = onSubmit({ id, price , startDate, endDate });
    this.setState({ error });
  }
  handleDateChange(startDate, endDate){
    this.setState({ startDate, endDate });
  }
  render() {
    const { guestsNumber, imageUrl, price, description } = this.props;
    const { error } = this.state;
    return (
      <div className="row sample">
        <div className="col-md-2 date-form">
          <img src={imageUrl} width="150px" />
        </div>
        <div className="col-md-2 date-form">
          <p>
            <b>Количество мест:</b> { guestsNumber }<br />
            <b>Цена:</b><span className="cursive-font">${price}</span>
          </p>
        </div>
        <div className="col-md-5 date-form">
          <p>{description}</p>
        </div>
        <Form className="col-md-3 date-form" onSubmit={this.handleSubmit}>
          <input type="submit" value="Добавить" className="btn btn-success col-md-12" />
          <DateRangePicker onChange={this.handleDateChange}/>
          {error && <p>error</p>}
        </Form>
      </div>
    );
  }
}

export default RoomTile;