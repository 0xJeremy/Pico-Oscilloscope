import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { paperColor, paddingSize, colorOrange } from './PageStyles';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '64.75vh',
    maxWidth: '100%',
    position: 'relative',
    marginBottom: paddingSize,
    marginLeft: paddingSize,
    marginTop: paddingSize,
  },
  paper: {
    marginBottom: paddingSize,
    marginRight: paddingSize,
    marginTop: paddingSize,
    textAlign: 'center',
    color: colorOrange,
    fontSize: '40px',
    backgroundColor: paperColor,
    minHeight: '64.75vh',
  }
}));

export default function Plot(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        This is some text!
      </Paper>
    </div>
  )
};

