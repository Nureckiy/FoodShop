import React from 'react';

import * as utils from '../../utils/utils';

const BookingSummaryControl = ({ className, arrivalDate, departureDate, onSubmit, id }) => (
  <div className={className}>
    <button type="button" className="btn col-sm-12" onClick={() => onSubmit(id)} >Удалить</button>
    <p><span className="glyphicon glyphicon-calendar" />
      {utils.clippedDateFormat(arrivalDate)} - {utils.clippedDateFormat(departureDate)}
    </p>
  </div>
);

export default BookingSummaryControl;