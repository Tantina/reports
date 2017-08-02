import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Radio } from 'react-bootstrap';

const ReportType = (props) => {
  const { type, onChange } = props;
  return (
    <FormGroup controlId="formControlsRadio">
      <ControlLabel>Report Type</ControlLabel>
      <Radio
        name="radioGroup"
        value="aggregate-access"
        checked={type === 'aggregate-access'}
        onChange={onChange}
      >
        Lesson Aggregate Access Data Report
      </Radio>
      {' '}
      <Radio
        name="radioGroup"
        value="session-level"
        checked={type === 'session-level'}
        onChange={onChange}
      >
        Session Level Data Report
      </Radio>
      {' '}
      <Radio
        name="radioGroup"
        value="aggregate-user"
        checked={type === 'aggregate-user'}
        onChange={onChange}
      >
        Lesson Aggregate User Performance Data Report
      </Radio>
    </FormGroup>
  );
};

ReportType.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ReportType;
