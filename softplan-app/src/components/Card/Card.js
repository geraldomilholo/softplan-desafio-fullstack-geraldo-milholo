import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  cardPlanoAcao: {
    marginTop: 20
  },
  cardHeader: {
    background: theme.palette.header.background
  }
}));

const CardComponent = ({ children, title }) => {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.cardPlanoAcao}>
      <CardHeader title={title} className={classes.cardHeader}/>
      <CardContent> {children} </CardContent>
    </Card>
  );
}

CardComponent.propTypes = {
  title: PropTypes.string.isRequired
};

export default CardComponent;