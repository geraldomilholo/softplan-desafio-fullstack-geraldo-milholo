/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/jsx-max-props-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { 
  AppBar,
  Box, 
  Grid,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appBar: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    background: theme.palette.header.background,
    boxShadow: 'none'
  },
  container: {
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
    borderRadius: 4
  },
  indicator: {
    display: 'none',
  },
  root: {
    '&:not(:first-of-type)': {
      marginLeft: -1,
    },
    background: theme.palette.header.background,
    color: theme.palette.black,
    opacity: 1
  },
  selected: {
    borderBottomWidth: 0,
    background: theme.palette.white,
    color: theme.palette.black
  },
  wrapper: {
    opacity: 0.7,
  },
}));

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Typography
      aria-labelledby={`simple-tab-${index}`}
      component="div"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const getTabPanels = (tabPanels, tab) => {
  return tabPanels.map((t, i) => {
    return (
      <TabPanel key={i} value={tab} index={i}>
        {t.element}
      </TabPanel>
    )
  })
}

const getTabs = (classes, classNameSelected, classNameRoot, tabPanels) => {
  return tabPanels.map((t, i) => (
    <Tab 
      key={i} 
      label={t.label} 
      id={`simple-tab-${i}`}
      classes={{
        root:  clsx(classes.root, classNameRoot),
        selected: clsx(classes.selected, classNameSelected),
        wrapper: classes.wrapper
      }}
    />
  ))
}

const TabForm = ({ tabPanels, classNameAppBar, classNameContainer, classNameSelected, classNameRoot }) => {
  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => setTab(newValue);

  const classes = useStyles();

  return (
    <Grid className={clsx(classes.container, classNameContainer)}>
      <AppBar position="static" className={clsx(classes.appBar, classNameAppBar)}>
        <Tabs 
          value={tab} 
          onChange={handleChange}
          classes={{
            indicator: classes.indicator
          }}
        >
          {getTabs(classes, classNameSelected, classNameRoot, tabPanels)}
        </Tabs>
      </AppBar>
      {getTabPanels(tabPanels, tab)}
    </Grid>
  );
};

TabForm.propTypes = {
  tabPanels: PropTypes.array.isRequired
};

export default TabForm;
