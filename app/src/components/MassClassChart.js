import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#4fbbd6',
    backgroundColor: '#242730',
    borderColor: '#4fbbd6',
    height: '3vh',
    minWidth: '4vw',
    width: '4vw',
    top: '0.8vh'
  },
  paper: {
    marginBottom: '8px',
    marginRight: '8px',
    marginTop: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '40px',
    backgroundColor: '#242730',
    minHeight: '32vh',
    padding: '0 0 0 0'
  },
}));

export default function MassClassChart(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>

    </Paper>
  )
};
