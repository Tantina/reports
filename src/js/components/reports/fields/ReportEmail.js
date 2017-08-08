import React from 'react';
import PropTypes from 'prop-types';

import FieldGroup from '../../form-fields/FieldGroup';

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
      onChange={onChange}
    />
  );
};

ReportEmail.propTypes = {
  email: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ReportEmail;
