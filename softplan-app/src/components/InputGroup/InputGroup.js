/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-sort-props */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import {
  Grid,
  FormGroup,
  FormLabel,
  Tooltip,
} from '@material-ui/core';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles(() => ({
  icon: {
    width: 15,
    height: 15,
    color: 'blue'
  }
}));

const InputGroup = ({ children, label, title, placement, useTooltip, isRequired, className }) => {
  const classes = useStyles();
  const labelValue = isRequired ? `${label}: *` : `${label}:`
  return (
    <FormGroup component="fieldset" className={className}>
      <FormLabel component="legend"> 
        { useTooltip ? 
          (<Grid 
            alignItems="center" 
            container 
            direction="row" 
            justify="flex-start" 
            spacing={1}
          >
            <Grid item> {labelValue}: </Grid>
            <Grid item>  
              <Tooltip 
                arrow 
                placement={placement}
                title={title} 
              >
                <InfoOutlinedIcon className={classes.icon}/>
              </Tooltip>
            </Grid>
          </Grid>) : <>{labelValue}</>
        }
      </FormLabel>
      {children}
    </FormGroup>
  );
}

InputGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string.isRequired,
  placement: PropTypes.string,
  title: PropTypes.string,
  useTooltip: PropTypes.bool,
};

InputGroup.defaultProps = {
  isRequired: false,
  placement: 'top',
  useTooltip: false,
  title: '',
  className: null
};

export default InputGroup;