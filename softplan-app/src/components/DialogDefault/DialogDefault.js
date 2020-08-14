/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/styles';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    background: theme.palette.primary.main,
    '& h2': {
      color: theme.palette.white
    }
  },
}));

const DialogDefault = ({ open, handlerCancel, handlerConfirm,  title, fullWidth, children }) => {
  
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Dialog
      fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
      open={open}
      onClose={handlerCancel}
      fullWidth={fullWidth}
      maxWidth="md"
      disableBackdropClick={true}
    >
      <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handlerCancel} color="primary"> Cancelar </Button>
        <Button onClick={handlerConfirm} color="primary" autoFocus> Salvar </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogDefault.defaultProps = {
  fullWidth: false,
};

DialogDefault.propTypes = {
  children: PropTypes.element,
  fullWidth: PropTypes.bool,
  handlerCancel: PropTypes.func.isRequired,
  handlerConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default DialogDefault;