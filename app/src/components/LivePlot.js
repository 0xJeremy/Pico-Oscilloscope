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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Plot
          className={classes.plot}
          data={[
            {
              x: x,
              y: data[1],
              type: "scatter",
              mode: "lines+markers",
              marker: { color: colorRed },
              name: "ADC 1",
            },
            {
              x: x,
              y: data[2],
              type: "scatter",
              mode: "lines+markers",
              marker: { color: colorBlue },
              name: "ADC 2",
            },
            {
              x: x,
              y: data[3],
              type: "scatter",
              mode: "lines+markers",
              marker: { color: colorGreen },
              name: "ADC 3",
            },
            {
              x: x,
              y: data[4],
              type: "scatter",
              mode: "lines+markers",
              marker: { color: colorYellow },
              name: "ADC 4",
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
                text: "Time",
              },
              zeroline: true,
              zerolinecolor: "#777777",
              zerolinewidth: 3,
              gridcolor: "#777777",
              range: [-3, 3],
              dtick: 0.5,
              showticklabels: false,
            },
            yaxis: {
              title: {
                text: "Voltage (mV)",
              },
              zeroline: true,
              zerolinecolor: "#777777",
              zerolinewidth: 3,
              gridcolor: "#777777",
              range: [-101, 101],
              dtick: 20,
            },
          }}
        />
      </Paper>
    </div>
  );
}
