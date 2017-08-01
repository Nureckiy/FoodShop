import React, { Component } from 'react';

import * as utils from '../../utils/utils';

class BookingSummaryControl extends Component {
  render() {
    const { className, arrivalDate, departureDate } = this.props;
    return (
      <div className={className}>
        <button type="button" className="btn col-sm-12" onClick={this.handleClick.bind(this)} >Удалить</button>
        <p><span className="glyphicon glyphicon-calendar" />
          {utils.clippedDateFormat(arrivalDate)} - {utils.clippedDateFormat(departureDate)}
        </p>
      </div>
    );
  }

  handleClick() {
    const { onSubmit, id } = this.props;
    onSubmit(id);
  }
}

export default BookingSummaryControl;