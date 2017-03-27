/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import dateformat from 'dateformat';

class BookingSummaryControl extends Component {
  renderDateRange() {
    const { arrivalDate, departureDate } = this.props;
    const renderDate = (date) => dateformat(date, 'dd.mm');
    return `${renderDate(arrivalDate)} - ${renderDate(departureDate)}`;
  }
  handleClick() {
    const { onSubmit, id } = this.props;
    onSubmit(id);
  }
  render() {
    const { className } = this.props;
    const dateRange = this.renderDateRange();
    return (
      <div className={className}>
        <button type="button" className="btn col-sm-12" onClick={this.handleClick.bind(this)} >Удалить</button>
        <p><span className="glyphicon glyphicon-calendar" />{ dateRange }</p>
      </div>
    );
  }
}

export default BookingSummaryControl;