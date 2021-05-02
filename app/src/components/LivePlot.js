import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Plot from "react-plotly.js";
import {
  paperColor,
  paddingSize,
  colorOrange,
  colorRed,
  colorBlue,
  colorGreen,
  colorYellow,
  plotGridColor,
} from "./PageStyles";

const plotHeight = "91vh";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: plotHeight,
    maxWidth: "100%",
    position: "relative",
    marginBottom: paddingSize,
    marginLeft: paddingSize,
    marginTop: paddingSize,
  },
  paper: {
    marginBottom: paddingSize,
    marginRight: paddingSize,
    marginTop: paddingSize,
    textAlign: "center",
    color: colorOrange,
    fontSize: "40px",
    backgroundColor: paperColor,
    minHeight: plotHeight,
  },
  plot: {
    width: "100%",
    height: plotHeight,
  },
}));

function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + step * i);
  }
  return arr;
}

export default function LivePlot(props) {
  const classes = useStyles();
  const data = props.data;
  const x = makeArr(-3, 3, props.maxDataSet);

  const plotData = [colorRed, colorBlue, colorGreen, colorYellow].map(
    (color, index) => {
      return {
        x: x,
        y: data[index],
        type: "scatter",
        mode: "lines+markers",
        marker: { color: color },
        name: `ADC ${index + 1}`,
      };
    }
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Plot
          className={classes.plot}
          data={plotData}
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
                text: "Time",
              },
              zeroline: true,
              zerolinecolor: plotGridColor,
              zerolinewidth: 3,
              gridcolor: plotGridColor,
              range: [-3, 3],
              dtick: 0.25,
              showticklabels: false,
            },
            yaxis: {
              title: {
                text: "Voltage (mV)",
              },
              zeroline: true,
              zerolinecolor: plotGridColor,
              zerolinewidth: 3,
              gridcolor: plotGridColor,
              // autorange: true,
              range: [-3350, 3350],
              dtick: 300,
            },
          }}
        />
      </Paper>
    </div>
  );
}
