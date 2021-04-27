import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Plot from "react-plotly.js";
import { paperColor, paddingSize, colorOrange } from './PageStyles';

const plotHeight = '91vh';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: plotHeight,
    maxWidth: '100%',
    position: 'relative',
    marginBottom: paddingSize,
    marginLeft: paddingSize,
    marginTop: paddingSize,
  },
  paper: {
    marginBottom: paddingSize,
    marginRight: paddingSize,
    marginTop: paddingSize,
    textAlign: 'center',
    color: colorOrange,
    fontSize: '40px',
    backgroundColor: paperColor,
    minHeight: plotHeight,
  },
  plot: {
    width: '100%',
    height: plotHeight,
  }
}));

export default function LivePlot(props) {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [dataLength, setDataLength] = React.useState(0);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Plot
            className={classes.plot}
            data={[
              {
                x: [...Array(dataLength).keys()],
                y: data,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "#f50057" },
              },
            ]}
            layout={{
              plot_bgcolor: paperColor,
              paper_bgcolor: paperColor,
              font: {
                family: "Raleway, sans-serif",
                size: 20,
                color: colorOrange,
              },
              xaxis: {
                title: {
                  text: "Time (s)",
                },
                gridcolor: "#777777",
              },
              yaxis: {
                title: {
                  text: "Voltage (mV)",
                },
                gridcolor: "#777777",
              },
            }}
          />
      </Paper>
    </div>
  )
};

