import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';

const useStyles = makeStyles({
  root: {
    maxHeight: '33vh',
    backgroundColor: '#242730',
  },
  table: {
    minWidth: 650,
  }
});

export default function DataTable(props) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>

    </TableContainer>
  );
}
