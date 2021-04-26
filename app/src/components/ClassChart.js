import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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



export default function ClassChart(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>

    </Paper>
  )
};
