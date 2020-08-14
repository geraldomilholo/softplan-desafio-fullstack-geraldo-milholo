/* eslint-disable react/no-multi-comp */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/jsx-max-props-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/styles';
import { TableCell, Grid } from '@material-ui/core';
import { Table } from '../../components';

import ProcessForm from './ProcessForm';

import * as selectorsAuth from '../../store/auth/reducer';
import * as selectorsProcesses from '../../store/process/reducer';
import { 
  fetchProcesses, 
  saveProcess, 
  updateProcess, 
  deleteProcess 
} from '../../store/process/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
}));

const ProcessView = ({ fetchProcesses, saveProcess, updateProcess, deleteProcess, processes, role }) => {
  const [open, setOpen] = useState(false);
  const [processId, setProcessId] = useState(null);
  const [canAdd, setCanAdd] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [disabledSeem, setDisabledSeem] = useState(false);

  const [titles] = useState(['Nome', 'Usuários', 'Pendente']);
  const classes = useStyles();

  const renderRows = data => {
    return (
      <>
        <TableCell>{data.name}</TableCell>
        <TableCell>{data && data.usersNames ? data.usersNames.join(', ') : ''}</TableCell>
        <TableCell>{data.peding? 'Sim' : 'Não'}</TableCell>
      </>
    )
  }

  useEffect(() => {
    if (role && role.code === 'ADMIN') {
      setCanAdd(true);
      setCanDelete(true);
    } else if (role && role.code === 'TRIADOR') {
      setCanAdd(true);
      setDisabledSeem(true);
    }
  }, [role]);

  useEffect(() => {
    fetchProcesses();
  }, [fetchProcesses]);

  const onEdit = id => {
    setProcessId(id);
    setOpen(true);
  }

  const onAdd = () => {
    setProcessId(null);
    setOpen(true);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.root}>
          <Table 
            rows={processes}
            titles={titles}
            headerTitle="Processos"
            deleteMessage="O processo será removido e não poderá ser mais recuperado."
            renderRows={renderRows}
            hasRowActions
            hasAdd={canAdd}
            onEdit={onEdit}
            onDelete={id => deleteProcess(id)}
            onAdd={onAdd}
            canDelete={canDelete}
          />
          <ProcessForm
            disabledSeem={disabledSeem}
            open={open}
            processId={processId}
            onCancel={() => {
              setOpen(false);
              setProcessId(null);
            }}
            onSave={values => {
              setOpen(false);
              if (processId) updateProcess(processId, values);
              else saveProcess(values);
              setProcessId(null);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

ProcessView.propTypes = {
  fetchProcesses: PropTypes.func.isRequired,
  saveProcess: PropTypes.func.isRequired,
  deleteProcess: PropTypes.func.isRequired,
  processes: PropTypes.array.isRequired,
  role: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  processes: selectorsProcesses.getProcesses(state),
  role: selectorsAuth.getRole(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProcesses,
  saveProcess, 
  updateProcess,
  deleteProcess
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProcessView);