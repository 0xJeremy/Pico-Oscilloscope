import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { paperColor, paddingSize } from './PageStyles';

const useStyles = makeStyles({
  paper: {
    marginLeft: paddingSize,
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '18px',
    backgroundColor: paperColor,
    minHeight: '32vh'
  },
});

export default function BottomLeftMenu(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>

    </Paper>
  );
}
