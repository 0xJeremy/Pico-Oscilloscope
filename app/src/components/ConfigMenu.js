import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Paper from "@material-ui/core/Paper";
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
    minHeight: "24.7vh",
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
}));

export default function ConfigMenu(props) {
  const classes = useStyles();
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
      <Typography className={classes.channelTitle}>Config Menu</Typography>

      <Grid container className={classes.grid}>
        <Grid item xs={4}>
          <Typography className={classes.gridText}>
            Toggle All Channels
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <StyledSwitch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.gridText}>Invert All Axes</Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <StyledSwitch
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
              />
            }
          />
        </Grid>
      </Grid>

      <Grid container className={classes.grid}>
        <Grid item xs={5}>
          <Typography className={classes.gridText}>
            All Channel Frequencies
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <FrequencySlider
            className={classes.input}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={Math.floor(Math.random() * 101)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
