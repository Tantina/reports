import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const { string, bool, func } = PropTypes;

const ReportEmails = (props) => {
  const { emails, isValid, onChange } = props;

  return (
    <FormGroup controlId="formControlsTextarea" validationState={isValid ? null : 'error'}>
      <ControlLabel>User Email Addresses (Optional)</ControlLabel>
      <FormControl
        componentClass="textarea"
        value={emails}
        onChange={onChange}
      />
      <HelpBlock>Comma or Line Separated Email Adresses</HelpBlock>
    </FormGroup>
  );
};

ReportEmails.propTypes = {
  emails: string.isRequired,
  isValid: bool.isRequired,
  onChange: func.isRequired
};

export default ReportEmails;
