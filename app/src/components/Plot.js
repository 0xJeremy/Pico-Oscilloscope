import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '64.75vh',
    maxWidth: '100%',
    position: 'relative',
    marginBottom: '8px',
    marginLeft: '8px',
    marginTop: '8px',
  },
  paper: {
    marginBottom: '8px',
    marginRight: '8px',
    marginTop: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '40px',
    backgroundColor: '#242730',
    minHeight: '64.75vh',
  }
}));

export default function Plot(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>

      </Paper>
    </div>
  )
};

