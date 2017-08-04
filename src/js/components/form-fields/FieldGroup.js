import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const FieldGroup = (props) => {
  const { id, label, help, type, value, onChange, isValid } = props;

  return (
    <FormGroup controlId={id} validationState={isValid ? null : 'error'}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl onChange={onChange} type={type} value={value} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

FieldGroup.defaultProps = {
  label: '',
  help: '',
  isValid: true
};

export default FieldGroup;
