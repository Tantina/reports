import React from 'react';
import PropTypes from 'prop-types';

import FieldGroup from '../../form-fields/FieldGroup';

const { string, bool, func } = PropTypes;

const ReportEmail = (props) => {
  const { email, onChange, isValid } = props;

  return (
    <FieldGroup
      id="formControlsEmail"
      type="email"
      value={email}
      label="Email This Report to"
      placeholder="Enter email"
      isValid={isValid}
      isRequired
      onChange={onChange}
    />
  );
};

ReportEmail.propTypes = {
  email: string.isRequired,
  isValid: bool.isRequired,
  onChange: func.isRequired
};

export default ReportEmail;
