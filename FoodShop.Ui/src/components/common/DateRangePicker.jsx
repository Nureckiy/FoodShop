/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class DatePickerRange extends Component {

  constructor() {
    super();
    this.state = {
      focused: false
    };
  }

  onDatesChange({ startDate, endDate }) {
    const { onChange } = this.props;
    this.setState({ startDate, endDate });
    onChange(startDate, endDate);
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
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
}

export default DatePickerRange;