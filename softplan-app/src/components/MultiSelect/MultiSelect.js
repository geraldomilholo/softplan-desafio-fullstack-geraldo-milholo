import React from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import InputGroup from '../InputGroup'; 
import { Select, MenuItem, InputBase } from '@material-ui/core';

const BaseInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const MultiSelect = ({ label, onChange, name, title, required, options, value, disabled }) => {
  return (
    <InputGroup
      label={label}
      title={title}
      isRequired={required}
    >
      <Select
        name={name}
        multiple
        disabled={disabled}
        value={value || 'NA'}
        onChange={onChange}
        input={<BaseInput />}
      >
        {options.map(o => (
          <MenuItem key={o.id} value={o.id}>
            {o.name}
          </MenuItem>
        ))}
      </Select>
    </InputGroup>
  );
}

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  placement: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};

MultiSelect.defaultProps = {
  title: '',
  required: false,
  disabled: false
}

export default MultiSelect;