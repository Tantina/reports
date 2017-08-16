import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const { string, func } = PropTypes;

const ReportAccessGroup = (props) => {
  const { access, onChange } = props;
  return (
    <FormGroup controlId="formControlsSelect">
      <ControlLabel>Access Group</ControlLabel>
      <FormControl
        componentClass="select"
        placeholder="select"
        value={access}
        onChange={onChange}
      >
        <option value="group1">group1</option>
        <option value="group2">group2</option>
        <option value="group3">group3</option>
      </FormControl>
    </FormGroup>
  );
};

ReportAccessGroup.propTypes = {
  access: string.isRequired,
  onChange: func.isRequired
};

export default ReportAccessGroup;
