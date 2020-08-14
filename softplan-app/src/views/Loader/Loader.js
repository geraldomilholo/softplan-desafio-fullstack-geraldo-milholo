/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import * as selectorsLoader from '../../store/loader/reducer';
import { Grid, CircularProgress } from '@material-ui/core'


const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: '9999',
    background: '#4c227040'
  },
  container: {
    paddingTop: '25%',
    paddingLeft: '45%'
  }
}));

const Toast = ({ loading }) => {
  const [showLoading, setShowLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setShowLoading(loading);
  }, [loading]);

  return (
    <>
      {showLoading ? 
        <Grid className={classes.root}>
          <Grid className={classes.container}>
            <CircularProgress size={75}/>
          </Grid>
        </Grid>
        : ''
      }
    </>
  )
};

Toast.propTypes = {
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loading: selectorsLoader.getLoading(state),
});

export default connect(mapStateToProps, null)(Toast);
