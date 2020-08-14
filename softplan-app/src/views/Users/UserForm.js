/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-sort-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { Input, DefaultSelect, DialogDefault } from '../../components';

import * as selectorsUsers from '../../store/user/reducer';
import { clearUserSelected, getUserById } from '../../store/user/actions';

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'é obrigatório' },
  },
  email: {
    presence: { allowEmpty: false, message: 'é obrigatório' },
  },
  role: {
    presence: { allowEmpty: false, message: 'é obrigatório' },
  }
};

const useStyles = makeStyles(() => ({
  fieldContainer: {
    paddingBottom: '0px !important'
  },
  form: {
    paddingBottom: 20
  }
}));

const UserForm = ({ onCancel, onSave, open, userId, getUserById, selectedUser, clearUserSelected }) => {
  const classes = useStyles();
  const [roleOptions] = useState([
    {'id': 'ADMIN', nome: 'Administrador'},
    {'id': 'TRIADOR', nome: 'Usuário-triador'},
    {'id': 'FINALIZADOR', nome: 'Usuário-finalizador'}
  ]);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});

  useEffect(() => {
    if (userId) getUserById(userId);
  }, [userId, getUserById]);

  useEffect(() => {
    if (userId && selectedUser && selectedUser.role) setValues({ ...selectedUser, role: selectedUser.role.code });
  }, [userId, selectedUser]);

  const onSaveLocal = () => {
    const erros = validate(values, schema);
    setErrors(erros);
    if (!erros) {
      onSave({ ...values, peding: values.peding === 'true' });
      setDefaultValues();
    }
  }
  
  const setDefaultValues = () => {
    setValues({});
    setErrors({});
    clearUserSelected();
  }

  const onCancelLocal = () => {
    onCancel();
    setDefaultValues();
  }

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <DialogDefault
      open={open}
      handlerCancel={onCancelLocal}
      handlerConfirm={onSaveLocal}
      title={values && values.name ? values.name : 'Cadastrar Novo Usuário'}
    >
      <form autoComplete="off" noValidate className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={8} className={classes.fieldContainer}>
            <Input
              error={errors && errors.name && errors.name && errors.name.length > 0}
              label="Nome"
              name="name"
              isRequired
              onChange={handleChange}
              value={values.name}
            />
          </Grid>
          <Grid item xs={4} className={classes.fieldContainer}>
            <DefaultSelect
              error={errors && errors.role && errors.role && errors.role.length > 0}
              name="role"
              label="Role"
              isRequired
              onSelect={handleChange}
              value={values.role}
              options={roleOptions}
            />
          </Grid>
          <Grid item xs={8} className={classes.fieldContainer}>
            <Input
              error={errors && errors.email && errors.email && errors.email.length > 0}
              label="Email"
              name="email"
              isRequired
              onChange={handleChange}
              value={values.email}
            />
          </Grid>
        </Grid>
      </form>
    </DialogDefault>
  );
};

UserForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  processId: PropTypes.string,
  getUserById: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
  clearUserSelected: PropTypes.func.isRequired,
};

UserForm.defaultValue = {
  processId: null,
  selectedUser: null
}

const mapStateToProps = state => ({
  selectedUser: selectorsUsers.getSelectedUser(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  clearUserSelected,
  getUserById
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserForm));
