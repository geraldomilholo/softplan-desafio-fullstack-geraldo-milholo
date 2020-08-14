import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import InputGroup from '../InputGroup'

const Input = ({ value, label, title, placement, placeholder, useTooltip, onChange, fullWidth, name, isRequired,
  error, helperText, rows, multiline, inputProps, disabled, classNameTextField, classNameInputGroup, type, min, step }) => {
  const defaultHelperText = helperText? helperText : "O campo é obrigatório";
  return (
    <InputGroup
      label={label}
      placement={placement}
      title={title}
      useTooltip={useTooltip}
      isRequired={isRequired}
      className={classNameInputGroup}
    >
      <TextField
        fullWidth={fullWidth}
        error={error}
        helperText={error ? defaultHelperText : ''}
        margin="dense"
        name={name}
        onChange={onChange}
        placeholder={placeholder ? placeholder : label}
        value={value}
        variant="outlined"
        rows={rows}
        multiline={multiline}
        InputProps={inputProps}
        disabled={disabled}
        className={classNameTextField}
        type={type}
        min={min}
        step={step}
      />
    </InputGroup>
  );
}

Input.propTypes = {
  children: PropTypes.node,
  error: PropTypes.array,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
  placement: PropTypes.string,
  rows: PropTypes.number,
  title: PropTypes.string,
  useTooltip: PropTypes.bool,
  value: PropTypes.string,
  inputProps: PropTypes.object,
  disabled: PropTypes.bool,
  classNameTextField: PropTypes.string,
  classNameInputGroup: PropTypes.string,
  type: PropTypes.string,
  min: PropTypes.string,
  step: PropTypes.string
};

Input.defaultProps = {
  error: null,
  fullWidth: true,
  helperText: '',
  label: '',
  multiline: false,
  placement: 'top',
  rows: 1,
  title: '',
  useTooltip: false,
  isRequired: false,
  value: '',
  inputProps: {},
  disabled: false,
  classNameTextField: '',
  classNameInputGroup: '',
  type: 'text',
  placeholder: null,
  onChange: () => {},
  name: '',
  min: null,
  step: null
};

export default Input;