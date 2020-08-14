import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import * as selectorsAuth from '../../../../../../store/auth/reducer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = ({ auth }) => {
  const [avatar, setAvatar] = useState('/images/default.png');
  const [name, setName] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (auth && auth.avatar) setAvatar(auth.avatar);
    if (auth) setName(auth.name);
  }, [auth]);

  return (
    <div className={classes.root}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={avatar}
      />
      <Typography className={classes.name} variant="h4"> {name} </Typography>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object
};

Profile.defaultProps = {
  auth: {}
};

const mapStateToProps = state => ({
  auth: selectorsAuth.getAuth(state),
});

export default connect(mapStateToProps, null)(Profile);
