import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class DatePickerRange extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { startDate, endDate, focusedInput } = this.state;
    return(
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onDatesChange={this.onDatesChange.bind(this)}
        onFocusChange={this.onFocusChange.bind(this)}
        focusedInput={focusedInput}
      />
    );
  }

  onDatesChange({ startDate, endDate }) {
    const { onChange } = this.props;
    this.setState({ startDate, endDate });
    onChange(startDate, endDate);
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }
}

export default DatePickerRange;