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

import UserForm from './UserForm';

import * as selectorsUser from '../../store/user/reducer';
import { fetchUsers, saveUser, updateUser, deleteUser } from '../../store/user/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
}));

const UserView = ({ fetchUsers, saveUser, updateUser, deleteUser, users }) => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const [titles] = useState(['Nome', 'Email', 'Role']);
  const classes = useStyles();

  const renderRows = data => {
    return (
      <>
        <TableCell>{data.name}</TableCell>
        <TableCell>{data.email}</TableCell>
        <TableCell>{data.role.name}</TableCell>
      </>
    )
  }

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onEdit = id => {
    setUserId(id);
    setOpen(true);
  }

  const onAdd = () => {
    setUserId(null);
    setOpen(true);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.root}>
          <Table 
            rows={users}
            titles={titles}
            headerTitle="Usuários"
            deleteMessage="O usuário será removido e não poderá ser mais recuperado."
            renderRows={renderRows}
            hasRowActions
            hasAdd
            onEdit={onEdit}
            onDelete={id => deleteUser(id)}
            onAdd={onAdd}
            onRefresh={() => fetchUsers()}
          />
          <UserForm
            open={open}
            userId={userId}
            onCancel={() => {
              setOpen(false);
              setUserId(null);
            }}
            onSave={values => {
              setOpen(false);
              if (userId) updateUser(userId, values);
              else saveUser(values);
              setUserId(null);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

UserView.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: selectorsUser.getUsers(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUsers,
  saveUser, 
  updateUser,
  deleteUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserView);