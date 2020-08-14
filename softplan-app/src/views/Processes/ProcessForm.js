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

import { Input, DefaultSelect, DialogDefault, MultiSelect } from '../../components';

import * as selectorsProcesses from '../../store/process/reducer';
import * as selectorsUsers from '../../store/user/reducer';
import { clearProcessSelected, getProcessById } from '../../store/process/actions';

const schema = {
  name: {
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

const ProcessForm = ({ onCancel, onSave, open, processId, getProcessById, selectedProcess, clearProcessSelected, users, roleCode }) => {
  const classes = useStyles();
  const [pedingOptions] = useState([
    {'id': 'true', nome: 'Sim'},
    {'id': 'false', nome: 'Não'}
  ]);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ peding: 'true', users: [] });

  useEffect(() => {
    if (processId) getProcessById(processId);
  }, [processId, getProcessById]);

  useEffect(() => {
    if (processId && selectedProcess) setValues(selectedProcess);
  }, [processId, selectedProcess]);

  const onSaveLocal = () => {
    const erros = validate(values, schema);
    setErrors(erros);
    if (!erros) {
      onSave({ ...values, peding: values.peding === 'true' });
      setDefaultValues();
    }
  }
  
  const setDefaultValues = () => {
    setValues({ peding: 'true', users: [] });
    setErrors({});
    clearProcessSelected();
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
      title={values && values.name ? values.name : 'Cadastrar Novo Processo'}
    >
      <form autoComplete="off" noValidate className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={8} className={classes.fieldContainer}>
            <Input
              error={errors && errors.name && errors.name && errors.name.length > 0}
              label="Nome"
              name="name"
              isRequired
              disabled={roleCode === 'FINALIZADOR'}
              onChange={handleChange}
              value={values.name}
            />
          </Grid>
          <Grid item xs={4} className={classes.fieldContainer}>
            <DefaultSelect
              name="peding"
              label="Pendente"
              disabled
              value={values.peding}
              options={pedingOptions}
            />
          </Grid>
          <Grid item xs={12} className={classes.fieldContainer}>
            <MultiSelect
              label="Usuários"
              name="users"
              disabled={roleCode === 'FINALIZADOR'}
              onChange={handleChange}
              options={users}
              value={values.users}
            />
          </Grid>
          <Grid item xs={12} className={classes.fieldContainer}>
            <Input
              label="Parecer"
              name="seem"
              disabled={roleCode === 'TRIADOR'}
              onChange={handleChange}
              value={values.seem}
              rows={3}
              multiline
            />
          </Grid>
        </Grid>
      </form>
    </DialogDefault>
  );
};

ProcessForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  processId: PropTypes.string,
  getProcessById: PropTypes.func.isRequired,
  selectedProcess: PropTypes.object,
  clearProcessSelected: PropTypes.func.isRequired,
};

ProcessForm.defaultValue = {
  processId: null,
  selectedProcess: null
}

const mapStateToProps = state => ({
  selectedProcess: selectorsProcesses.getSelectedProcess(state),
  users: selectorsUsers.getUsers(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  clearProcessSelected,
  getProcessById
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProcessForm));
