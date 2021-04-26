import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  dialog: {
    color: '#4fbbd6',
    backgroundColor: '#242730',
  },
  blue: {
    color: '#4fbbd6'
  },
  outline_blue: {
    borderColor: '#4fbbd6',
    height: '100%'
  },
  box: {
    backgroundColor: '#242730',
    color: '#4fbbd6',
    borderRadius: '0px'
  },
  paper: {
    borderRadius: '0px'
  },
  link: {
    color: 'white'
  }
}));

export default function InfoBox(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog className={classes.dialog} classes={{paper: classes.paper}} open={open} onClose={handleClose}>
        <DialogTitle className={classes.box} >Meteorite Data Visualizer</DialogTitle>
        <DialogContent className={classes.box} >
          <DialogContentText className={classes.box}>
            Welcome to the meteorite data visualizer. This page shows all the meteorite data ever collected by NASA.
            You can view the original dataset <a className={classes.link} href="https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh" target="_blank" rel="noopener noreferrer">here</a>.
            <br />
            Please enjoy.
            <br /><br />
            View the source code <a className={classes.link} href="https://github.com/0bLondon/VizFinal" target="_blank" rel="noopener noreferrer">here</a>.
            <br /><br />
            Made with ❤️ by Jeremy Kanovsky & Ben London
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.box} >
          <Button className={classes.blue} classes={{outlined: classes.outline_blue}} variant="outlined" onClick={handleClose} >
            Done!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
