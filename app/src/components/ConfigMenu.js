import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { paddingSize, colorOrange, paperColor } from "./PageStyles";

const StyledSwitch = withStyles({
  switchBase: {
    color: colorOrange,
    "&$checked": {
      color: colorOrange,
    },
    "&$checked + $track": {
      backgroundColor: colorOrange,
    },
  },
  checked: {},
  track: {},
})(Switch);

const FrequencySlider = withStyles({
  root: {
    color: colorOrange,
    height: 8,
    marginTop: "5px",
    marginLeft: "8px",
    width: "13vw",
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginBottom: paddingSize,
    marginRight: paddingSize,
    marginTop: paddingSize,
    textAlign: "center",
    color: colorOrange,
    border: "1px solid currentColor",
    backgroundColor: paperColor,
    minHeight: "31.5vh",
  },
  channelTitle: {
    fontSize: "24px",
    paddingBottom: "8px",
  },
  gridText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "4vh",
  },
  input: {},
  grid: {
    marginTop: "8px",
    marginBottom: "8px",
  },
  button: {
    marginTop: "2vh",
    // color: colorOrange,
    backgroundColor: colorOrange,
  },
}));

export default function ConfigMenu(props) {
  const classes = useStyles();
  const {updateAllEnabled, updateAllInverted, updateAllFrequencies, updateAllOffsets, sendStreamUpdate} = props;
  const [toggle, setToggle] = React.useState(false);
  const [inverted, setInverted] = React.useState(false);
  const [frequency, setFrequency] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const handleToggle = (event) => {
    setToggle(event.target.checked);
    updateAllEnabled(event.target.checked);
  }

  const handleInvert = (event) => {
    setInverted(event.target.checked);
    updateAllInverted(event.target.checked);
  }

  const handleFrequency = (event, value) => {
    setFrequency(value);
    updateAllFrequencies(value);
  }

  const handleOffset = (event, value) => {
    setOffset(value);
    updateAllOffsets(value);
  }

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.channelTitle}>
        Configuration Menu
      </Typography>

      <Grid container className={classes.grid}>
        <Grid item xs={4}>
          <Typography className={classes.gridText}>
            Toggle All Channels
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={<StyledSwitch onChange={handleToggle} checked={toggle} />}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.gridText}>Invert All Axes</Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={<StyledSwitch onChange={handleInvert} checked={inverted} />}
          />
        </Grid>
      </Grid>

      <Grid container className={classes.grid}>
        <Grid item xs={5}>
          <Typography className={classes.gridText}>
            All Channel Frequencies
          </Typography>
          <Typography className={classes.gridText}>
            All Channel Offsets
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <FrequencySlider
            key={`slider-config`}
            className={classes.input}
            valueLabelDisplay="auto"
            onChange={handleFrequency}
            value={frequency}
          />
          <FrequencySlider
            key={`slider-config`}
            className={classes.input}
            valueLabelDisplay="auto"
            onChange={handleOffset}
            value={offset}
          />
        </Grid>
      </Grid>

      {!paused &&
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PauseIcon />}
          onClick={() => {
            setPaused(!paused);
            sendStreamUpdate(true);
          }}
        >
          Pause Collection
        </Button>
      }

      {paused &&
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PlayArrowIcon />}
          onClick={() => {
            setPaused(!paused);
            sendStreamUpdate(false);
          }}
        >
          Resume Collection
        </Button>
      }

      
    </Paper>
  );
}
