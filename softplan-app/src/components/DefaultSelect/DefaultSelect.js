/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import InputGroup from '../InputGroup';

const DefaultSelect = ({ options, onSelect, value, error, helperText, label, isRequired, placement, title, useTooltip, name,
  disabled, showEmpty }) => {

  const defaultHelperText = helperText? helperText : "O campo é obrigatório";
  return (
    <InputGroup
      label={label}
      placement={placement}
      title={title}
      useTooltip={useTooltip}
      isRequired={isRequired}
    >
      <TextField
        error={error}
        fullWidth
        disabled={disabled}
        helperText={error ? defaultHelperText : ''}
        margin="dense"
        onChange={onSelect}
        select
        SelectProps={{ native: true }}
        value={value}
        variant="outlined"
        name={name}
      >
        {showEmpty ? <option key="NA" value="">Selecione...</option> : ''}
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))}
      </TextField>
    </InputGroup>
  );
}

DefaultSelect.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  placement: PropTypes.string,
  title: PropTypes.string,
  useTooltip: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  showEmpty: PropTypes.bool
};

DefaultSelect.defaultProps = {
  error: false,
  helperText: null,
  value: '',
  placement: 'top',
  title: '',
  useTooltip: false,
  isRequired: false,
  label: '',
  name: '',
  disabled: false,
  showEmpty: true
};

export default DefaultSelect;