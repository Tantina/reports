import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';

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
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

ReportDateRange.defaultProps = {
  startDate: null,
  endDate: null
};

export default ReportDateRange;
