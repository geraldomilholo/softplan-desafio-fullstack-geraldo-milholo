import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { Profile, SidebarNav } from './components';
import * as selectorsAuth from '../../../../store/auth/reducer';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = ({ open, variant, onClose, className, role }) => {
  const classes = useStyles();
  const pages = [
    {
      title: 'Processos',
      href: '/processos',
      icon: <AssignmentIcon />,
      show: true
    },
    {
      title: 'Usuários',
      href: '/usuarios',
      icon: <PeopleIcon />,
      show: role && role.code === 'ADMIN'
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages}/>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  role: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  role: selectorsAuth.getRole(state),
});

export default connect(mapStateToProps, null)(Sidebar);
