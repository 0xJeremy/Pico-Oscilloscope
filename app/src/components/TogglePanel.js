import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const YEARS = [1800, 2015];
const STEP_SIZE = 25;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  paper: {
    marginLeft: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '18px',
    backgroundColor: '#242730',
    minHeight: '33vh'
  },
  text: {
    paddingBottom: '24px',
  },
  blue: {
    color: '#4fbbd6',
    marginRight: '16px'
  },
  outline_blue: {
    borderColor: '#4fbbd6',
    height: '100%'
  },
  timeline: {
    marginTop: '24px',
    fontSize: '16px',
  },
  load: {
    fontSize: '16px',
  },
  alert: {
    backgroundColor: '#2f9bb6',
  }
});

const Timeline = withStyles({
  root: {
    color: '#4fbbd6',
    maxWidth: '90%'
  }
})(Slider)

function valuetext(value) {
  return `${value}`;
}

export default function TogglePanel(props) {
  const classes = useStyles();
  const [smallSnack, setSnackSmall] = React.useState(false);
  const [mediumSnack, setSnackMedium] = React.useState(false);
  const [largeSnack, setSnackLarge] = React.useState(false);
  const [animation, setAnimation] = React.useState(null);
  const timeline = props.timeline;
  const setTimeline = props.setTimeline;
  const setData = props.setData;

  const clickSmall = () => {
    setSnackSmall(true);
    setSnackMedium(false);
    setSnackLarge(false);
    setData('small');
  }
  const closeSmall = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setSnackSmall(false);
  }

  const clickMedium = () => {
    setSnackSmall(false);
    setSnackMedium(true);
    setSnackLarge(false);
    setData('medium');
  }
  const closeMedium = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setSnackMedium(false);
  }

  const clickLarge = () => {
    setSnackSmall(false);
    setSnackMedium(false);
    setSnackLarge(true);
    setData('large');
  }
  const closeLarge = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setSnackLarge(false);
  }


  const timelineChange = (event, newValue) => {
    setTimeline(newValue);
  };

  const startAnimation = () => {
    var tmpTimeline = timeline;
    if(tmpTimeline[0] === YEARS[0] && tmpTimeline[1] === YEARS[1]) {
      tmpTimeline = [YEARS[0], YEARS[0]+STEP_SIZE];
    }
    setTimeline(tmpTimeline);
    var interval = setInterval(() => {
      tmpTimeline[0] += STEP_SIZE;
      tmpTimeline[1] += STEP_SIZE;
      if(tmpTimeline[1] > YEARS[1]) {
        setAnimation(null);
        setTimeline([YEARS[0], YEARS[1]]);
        clearInterval(interval);
        return;
      }
      setTimeline(tmpTimeline);
    }, 1000);
    setAnimation(interval);
  }

  const pauseAnimation = () => {
    clearInterval(animation);
  }

  const stopAnimation = () => {
    clearInterval(animation);
    setAnimation(null);
    setTimeline([YEARS[0], YEARS[1]]);
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.text} >Data Options</div>

      <Typography className={classes.load} gutterBottom>
        Load Data Set
      </Typography>
      <Button className={classes.blue} classes={{outlined: classes.outline_blue}} variant="outlined" size="small" onClick={clickSmall} >Small</Button>
      <Button className={classes.blue} classes={{outlined: classes.outline_blue}} variant="outlined" size="small" onClick={clickMedium} >Medium</Button>
      <Button className={classes.blue} classes={{outlined: classes.outline_blue}} variant="outlined" size="small" onClick={clickLarge} >Large</Button>

      <Typography className={classes.timeline} id="range-slider" gutterBottom>
        Data Range ({timeline[0]} - {timeline[1]})
      </Typography>
      <Timeline
        value={timeline}
        onChange={timelineChange}
        min={YEARS[0]}
        max={YEARS[1]}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />

      <Typography className={classes.timeline} id="range-slider" gutterBottom>
        Timeline Animation
      </Typography>
      <Button className={classes.blue} classes={{outlined: classes.outline_blue}} variant="outlined" size="small" onClick={startAnimation} ><PlayCircleOutlineIcon /></Button>
      <Button className={classes.blue} classes={{outlined: classes.outline_blue}} variant="outlined" size="small" onClick={pauseAnimation} ><PauseCircleOutlineIcon /></Button>
      <Button className={classes.blue} classes={{outlined: classes.outline_blue}} variant="outlined" size="small" onClick={stopAnimation} ><HighlightOffOutlinedIcon /></Button>


      <Snackbar open={smallSnack} autoHideDuration={6000} onClose={closeSmall}>
        <Alert onClose={closeSmall} severity="success" color="info" classes={{filledInfo: classes.alert}}>
          Loading small data set!
        </Alert>
      </Snackbar>
      <Snackbar open={mediumSnack} autoHideDuration={6000} onClose={closeMedium}>
        <Alert onClose={closeMedium} severity="success" color="info" classes={{filledInfo: classes.alert}}>
          Loading medium data set!
        </Alert>
      </Snackbar>
      <Snackbar open={largeSnack} autoHideDuration={6000} onClose={closeLarge}>
        <Alert onClose={closeLarge} severity="success" color="info" classes={{filledInfo: classes.alert}}>
          Loading large data set!
        </Alert>
      </Snackbar>


    </Paper>
  );
}
