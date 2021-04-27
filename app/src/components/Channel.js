import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import { colorOrange, paddingSize, paperColor } from "./PageStyles";

const StyledSwitch = withStyles({
  switchBase: {
    color: props => props.channelColor,
    "&$checked": {
      color: props => props.channelColor,
    },
    "&$checked + $track": {
      backgroundColor: props => props.channelColor,
    },
  },
  checked: {},
  track: {},
})(Switch);

const FrequencySlider = withStyles({
  root: {
    color: props => props.channelColor,
    height: 8,
    marginTop: "5px",
    marginLeft: "8px",
    width: "15.5vw",
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
    color: props => props.channelColor,
    backgroundColor: paperColor,
    minHeight: "12vh",
    border: '1px solid currentColor',
  },
  channelTitle: {
    fontSize: "20px",
  },
  gridText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "4vh",
  },
}));

export default function Channel(props) {
  const classes = useStyles(props);
  const channelColor = props.channelColor;
  const channelNumber = props.channelNumber;
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.channelTitle}>
        ADC Channel {channelNumber}
      </Typography>

      <Grid container className={classes.grid}>
        <Grid item xs={4}>
          <Typography className={classes.gridText}>Channel Enabled</Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <StyledSwitch
                channelColor={channelColor}
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.gridText}>Invert Axis</Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <StyledSwitch
                channelColor={channelColor}
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
              />
            }
          />
        </Grid>
      </Grid>

      <Grid container className={classes.grid}>
        <Grid item xs={4}>
          <Typography className={classes.gridText}>
            Channel Frequency
          </Typography>
          <Typography className={classes.gridText}>
            Channel Offset
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <FrequencySlider
            channelColor={channelColor}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={Math.floor(Math.random() * 101)}
          />
          <FrequencySlider
            channelColor={channelColor}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={Math.floor(Math.random() * 101)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
