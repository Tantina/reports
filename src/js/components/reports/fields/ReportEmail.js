import React from 'react';
import PropTypes from 'prop-types';

import { regexpEmail } from '../../../constants/Regexp';
import FieldGroup from '../../form-fields/FieldGroup';

const ReportEmail = (props) => {
  const { email, onChange } = props;
  const isValidField = regexpEmail.test(email);

  return (
    <FieldGroup
      id="formControlsEmail"
      type="email"
      value={email}
      label="Email This Report"
      placeholder="Enter email"
      isValid={isValidField}
      isRequired
      onChange={onChange}
    />
  );
};

ReportEmail.propTypes = {
  email: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ReportEmail;
