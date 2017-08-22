import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const { string, bool, func } = PropTypes;

const FieldGroup = (props) => {
  const { id, label, help, type, value, onChange, isValid, isRequired } = props;

  return (
    <FormGroup controlId={id} validationState={isValid ? null : 'error'}>
      <ControlLabel>{label}{isRequired && <sup>*</sup>}</ControlLabel>
      <FormControl onChange={onChange} type={type} value={value} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

FieldGroup.propTypes = {
  id: string.isRequired,
  label: string,
  help: string,
  value: string.isRequired,
  type: string.isRequired,
  isValid: bool,
  isRequired: bool,
  onChange: func.isRequired
};

FieldGroup.defaultProps = {
  label: '',
  help: '',
  isValid: true,
  isRequired: false
};

export default FieldGroup;
