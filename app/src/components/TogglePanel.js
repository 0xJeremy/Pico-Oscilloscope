import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  paper: {
    marginLeft: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '18px',
    backgroundColor: '#242730',
    minHeight: '33vh'
  },
});

export default function TogglePanel(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>

    </Paper>
  );
}
