import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import { paddingSize, paperColor } from "./PageStyles";
import { minFrequency, maxFrequency, minOffset, maxOffset } from "./Common";

const StyledSwitch = withStyles({
  root: {
    marginTop: "-6px",
  },
  switchBase: {
    color: (props) => props.channelcolor,
    "&$checked": {
      // color: (props) => props.channelColor,
    },
    "&$checked + $track": {
      // backgroundColor: (props) => props.channelColor,
    },
  },
  checked: {},
  track: {},
})(Switch);

const FrequencySlider = withStyles({
  root: {
    color: (props) => props.channelcolor,
    height: 8,
    marginTop: "5px",
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

const StyledInput = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline": {
      color: "white",
    },
  },
})(Input);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginBottom: paddingSize,
    marginRight: paddingSize,
    marginTop: paddingSize,
    textAlign: "center",
    color: (props) => props.channelColor,
    backgroundColor: paperColor,
    minHeight: "14vh",
    border: "1px solid currentColor",
  },
  channelTitle: {
    fontSize: "20px",
  },
  bottomGridInputs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "4vh",
    paddingTop: "2px",
  },
  topGridInputs: {
    border: "1px solid transparent",
  },
  gridTitle: {
    border: "1px solid currentColor",
    borderRadius: "4px",
  },
  topGrid: {
    marginLeft: "8px",
    marginTop: "8px",
  },
  input: {
    marginTop: "10px",
    color: (props) => props.channelColor,
  },
}));

export default function Channel(props) {
  const classes = useStyles(props);
  const {
    index,
    channelColor,
    inverted,
    enabled,
    frequency,
    offset,
    updateInverted,
    updateEnabled,
    updateFrequency,
    updateOffset,
  } = props;

  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.topGrid}>
        <Grid item xs={2}>
          <Typography className={classes.gridTitle}>ADC {index + 1}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography className={classes.topGridInputs}>
            Channel Enabled
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <FormControlLabel
            control={
              <StyledSwitch
                className={classes.topGridInputs}
                channelcolor={channelColor}
                onChange={(event) => updateEnabled(index, event.target.checked)}
                checked={enabled}
              />
            }
          />
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.topGridInputs}>Invert Axis</Typography>
        </Grid>
        <Grid item xs={1}>
          <FormControlLabel
            control={
              <StyledSwitch
                className={classes.topGridInputs}
                channelcolor={channelColor}
                onChange={(event) =>
                  updateInverted(index, event.target.checked)
                }
                checked={inverted}
              />
            }
          />
        </Grid>
      </Grid>

      <Grid container className={classes.grid}>
        <Grid item xs={3}>
          <Typography className={classes.bottomGridInputs}>
            Frequency
          </Typography>
          <Typography className={classes.bottomGridInputs}>
            Offset (mV)
          </Typography>
        </Grid>

        <Grid item xs={7}>
          <FrequencySlider
            channelcolor={channelColor}
            key={`slider-${channelColor}`}
            valueLabelDisplay="auto"
            onChange={(event, value) => updateFrequency(index, value, false)}
            onChangeCommitted={(event, value) =>
              updateFrequency(index, value, true)
            }
            value={frequency}
            min={minFrequency}
            max={maxFrequency}
          />
          <FrequencySlider
            channelcolor={channelColor}
            key={`slider-${channelColor}-1`}
            valueLabelDisplay="auto"
            onChange={(event, value) => updateOffset(index, value, false)}
            onChangeCommitted={(event, value) =>
              updateOffset(index, value, true)
            }
            value={offset}
            min={minOffset}
            max={maxOffset}
          />
        </Grid>

        <Grid item xs={2}>
          <StyledInput
            className={classes.input}
            value={frequency}
            margin="dense"
            onChange={(event) =>
              updateFrequency(index, parseInt(event.target.value), true)
            }
            // onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: minFrequency,
              max: maxFrequency,
              type: "number",
            }}
          />
          <StyledInput
            className={classes.input}
            value={offset}
            margin="dense"
            onChange={(event) =>
              updateOffset(index, parseInt(event.target.value), true)
            }
            // onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: minOffset,
              max: maxOffset,
              type: "number",
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
