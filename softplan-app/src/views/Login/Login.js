/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/jsx-max-props-per-line */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  Typography,
  InputAdornment,
} from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { Input } from '../../components';
import * as authActions from '../../store/auth/actions';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'é obrigatório' },
    email: { message: 'não é válido' },
    length: { maximum: 64 }
  },
  password: {
    presence: { allowEmpty: false, message: 'é obrigatório' },
    length: { maximum: 128 }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2),
    background: 'rgb(232, 240, 254)'
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  input: {
    marginTop: 15
  }
}));

const Login = ({ history, login }) => {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleLogin = () => {
    login(formState.values, history);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.content} item lg={12} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <Grid container direction="row" justify="center" alignItems="center">
                <form className={classes.form}>
                  <Typography className={classes.title} variant="h2">
                    Login
                  </Typography>
                  <Input
                    error={hasError('email')}
                    classNameInputGroup={classes.input}
                    helperText={hasError('email') ? formState.errors.email[0] : null}
                    label="E-mail"
                    name="email"
                    onChange={handleChange}
                    isRequired
                    value={formState.values.email || ''}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Input
                    error={hasError('password')}
                    classNameInputGroup={classes.input}
                    helperText={hasError('password') ? formState.errors.password[0] : null}
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    isRequired
                    value={formState.values.password || ''}
                    type="password"
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!formState.isValid}
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={handleLogin}
                  >
                    Entrar
                  </Button>
                </form>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.object
};

const mapDispatchToProps = dispatch => bindActionCreators({
  ...authActions
}, dispatch);

export default connect(null, mapDispatchToProps)(withRouter(Login));
