import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

import { resetAuthStore } from '../../../../store/auth/actions';
import { clearUserStore } from '../../../../store/user/actions';
import { resetProcessStore } from '../../../../store/process/actions';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  logo: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 600
  }
}));

const Topbar = ({ className, onSidebarOpen, history }) => {
  const classes = useStyles();

  const onClick = () => {
    resetAuthStore();
    clearUserStore();
    resetProcessStore();
    history.push('/login');
  }

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/processos">
          <div className={classes.logo}>
            Gestão de Processos
          </div>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Tooltip title="Sair">
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={onClick}
          >
            <InputIcon />
          </IconButton>
        </Tooltip>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  history: PropTypes.object
};

const mapDispatchToProps = dispatch => bindActionCreators({
  resetAuthStore,
  clearUserStore,
  resetProcessStore
}, dispatch);

export default connect(null, mapDispatchToProps)(withRouter(Topbar));
