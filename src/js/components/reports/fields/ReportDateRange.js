import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';

const { object, func } = PropTypes;

const ReportDateRange = (props) => {
  const { startDate, endDate, onChange, focusedInput, onFocusChange } = props;

  return (
    <FormGroup>
      <ControlLabel>Filter By Date (Optional)</ControlLabel>
      <div>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onDatesChange={onChange}
          focusedInput={focusedInput}
          numberOfMonths={1}
          showClearDates
          isOutsideRange={() => false}
          onFocusChange={onFocusChange}
        />
      </div>
    </FormGroup>
  );
};

ReportDateRange.propTypes = {
  startDate: object,
  endDate: object,
  onChange: func.isRequired,
  focusedInput: PropTypes.oneOf(['startDate', 'endDate']),
  onFocusChange: func.isRequired
};

ReportDateRange.defaultProps = {
  startDate: null,
  endDate: null,
  focusedInput: null
};

export default ReportDateRange;
