import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { rightMenuStyle } from './PageStyles';
import Slider from '@material-ui/core/Slider';
import { colorOrange } from './PageStyles';


const StyledSwitch = withStyles({
  switchBase: {
    color: '#FF9F31',
    '&$checked': {
      color: colorOrange,
    },
    '&$checked + $track': {
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
    marginTop: '5px',
    marginLeft: '8px',
    width: '15.5vw'
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
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

const useStyles = makeStyles(theme => (rightMenuStyle));

export default function Channel(props) {
  const classes = useStyles();
  const channelNumber = props.channelNumber;
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
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

        <Grid item xs={4} >
          
	      	<Typography className={classes.gridText} >Channel Enabled</Typography>
	      	<Typography className={classes.gridText} >Channel Frequency</Typography>

        </Grid>

        <Grid item xs={6}>

	        <FormControlLabel control={<StyledSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />} />
	        <FrequencySlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50} />

        </Grid>

      </Grid>
      
    </Paper>
  )

};
