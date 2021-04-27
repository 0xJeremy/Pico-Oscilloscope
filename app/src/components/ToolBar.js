import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { paperColor, colorOrange } from './PageStyles';

const useStyles = makeStyles(theme => ({
	root: {
		background: paperColor,
		color: colorOrange,
	},
	name: {
		marginLeft: '-10px',
		fontSize: '2.2em',
	},
}));

function ToolBar(props) {
	const classes = useStyles()

	return (
		<Toolbar className={classes.root} >
			<Typography className={classes.name}>Pi[co] [OSS]illoscope</Typography>
    	</Toolbar>
	)
}

export default ToolBar;
