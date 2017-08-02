import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import { regexpEmail } from '../../../constants/Regexp';

const ReportEmails = (props) => {
  const { emails, onChange } = props;

  const isValidEmails = emails.every(email => (
    regexpEmail.test(email.trim())
  ));

  return (
    <FormGroup controlId="formControlsTextarea" validationState={isValidEmails ? null : 'error'}>
      <ControlLabel>User Email Addresses (Optional)</ControlLabel>
      <FormControl
        componentClass="textarea"
        value={emails.join()}
        onChange={onChange}
      />
      <HelpBlock>Comma or Line Separated Email Adresses</HelpBlock>
    </FormGroup>
  );
};

ReportEmails.propTypes = {
  emails: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ReportEmails;
