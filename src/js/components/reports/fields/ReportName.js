import React from 'react';
import PropTypes from 'prop-types';

import FieldGroup from '../../form-fields/FieldGroup';

const ReportName = (props) => {
  const { name, onChange, isValid } = props;

  return (
    <FieldGroup
      id="formControlsText"
      type="text"
      value={name}
      label="Report Name"
      placeholder="Enter name"
      help="Enter a unique name using alphanumeric characters (No spaces or special characters other than - dash and _ underscore). i.e. CPAexcel_may_june-2017"
      isValid={isValid}
      onChange={onChange}
    />
  );
};

ReportName.propTypes = {
  name: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ReportName;
