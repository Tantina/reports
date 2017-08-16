import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Radio } from 'react-bootstrap';
import { ReportTypes } from '../../../constants/ReportTypes';

const { string, func } = PropTypes;

const ReportType = (props) => {
  const { type, onChange } = props;
  return (
    <FormGroup controlId="formControlsRadio">
      <ControlLabel>Report Type</ControlLabel>
      { ReportTypes.map(reportType => (
        <Radio
          key={reportType.type}
          name="radioGroup"
          value={reportType.type}
          checked={type === reportType.type}
          onChange={onChange}
        >
          {reportType.name}
        </Radio>
      ))
      }
    </FormGroup>
  );
};

ReportType.propTypes = {
  type: string.isRequired,
  onChange: func.isRequired
};

export default ReportType;
