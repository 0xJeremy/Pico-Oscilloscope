import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Plot from "react-plotly.js";
import { paperColor, paddingSize, colorOrange } from "./PageStyles";

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
              zeroline: true,
              zerolinecolor: '#777777',
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
              zerolinecolor: '#777777',
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
