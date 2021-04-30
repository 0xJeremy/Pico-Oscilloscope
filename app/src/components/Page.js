import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "./ToolBar";
import LivePlot from "./LivePlot";
import Channel from "./Channel";
import InfoBox from "./InfoBox";
import ConfigMenu from "./ConfigMenu";
import { colorRed, colorBlue, colorGreen, colorYellow } from "./PageStyles";
import { defaultFrequency, defaultOffset } from "./Common";
import { socket } from "./Socket";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "6.4vh",
  },
}));

const colors = [colorRed, colorBlue, colorGreen, colorYellow];

export default function Page() {
  const classes = useStyles();
  const maxDataSet = 60;
  // Here be dragons. I'm not proud...
  const [data, setData] = React.useState({
    0: [],
    1: [],
    2: [],
    3: [],
  });
  const [enabled, setEnabled] = React.useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });
  const [inverted, setInverted] = React.useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });
  const [frequency, setFrequency] = React.useState({
    0: defaultFrequency,
    1: defaultFrequency,
    2: defaultFrequency,
    3: defaultFrequency,
  });
  const [offset, setOffset] = React.useState({
    0: defaultOffset,
    1: defaultOffset,
    2: defaultOffset,
    3: defaultOffset,
  });

  const updateEnabled = (pin, value) => {
    setEnabled({ ...enabled, [pin]: value });
    // This is redundant but necessary...
    socket.emit("updateEnabled", { ...enabled, [pin]: value });
  };

  const updateAllEnabled = (value) => {
    setEnabled({ 0: value, 1: value, 2: value, 3: value });
    socket.emit("updateEnabled", { 0: value, 1: value, 2: value, 3: value });
  };

  const updateInverted = (pin, value) => {
    setInverted({ ...inverted, [pin]: value });
    socket.emit("updateInverted", { ...inverted, [pin]: value });
  };

  const updateAllInverted = (value) => {
    setInverted({ 0: value, 1: value, 2: value, 3: value });
    socket.emit("updateInverted", { 0: value, 1: value, 2: value, 3: value });
  };

  const updateFrequency = (pin, value, sendUpdate) => {
    setFrequency({ ...frequency, [pin]: value });
    if (sendUpdate) {
      socket.emit("updateFrequency", { ...frequency, [pin]: value });
    }
  };

  const updateAllFrequencies = (value) => {
    setFrequency({ 0: value, 1: value, 2: value, 3: value });
    socket.emit("updateFrequency", { 0: value, 1: value, 2: value, 3: value });
  };

  const updateOffset = (pin, value, sendUpdate) => {
    setOffset({ ...offset, [pin]: value });
    if (sendUpdate) {
      socket.emit("updateoffset", { ...offset, [pin]: value });
    }
  };

  const updateAllOffsets = (value) => {
    setOffset({ 0: value, 1: value, 2: value, 3: value });
    socket.emit("updateoffset", { 0: value, 1: value, 2: value, 3: value });
  };

  const sendStreamUpdate = (value) => {
    socket.emit("streamUpdate", value);
  };

  React.useEffect(() => {
    socket.on("data", (newData) => {
      console.log("data:", newData);
      setData((data) => {
        if (data[0].length >= maxDataSet) {
          return {
            0: newData[0],
            1: newData[1],
            2: newData[2],
            3: newData[3],
          };
        } else {
          return {
            0: data[0].concat(newData[0]),
            1: data[1].concat(newData[1]),
            2: data[2].concat(newData[2]),
            3: data[3].concat(newData[3]),
          };
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AppBar>
        <ToolBar />
      </AppBar>

      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={9}>
          <LivePlot data={data} maxDataSet={maxDataSet} />
        </Grid>

        <Grid item xs={3}>
          {colors.map((value, index) => {
            return (
              <Channel
                index={index}
                channelColor={value}
                enabled={enabled[index]}
                updateEnabled={updateEnabled}
                inverted={inverted[index]}
                updateInverted={updateInverted}
                frequency={frequency[index]}
                updateFrequency={updateFrequency}
                offset={offset[index]}
                updateOffset={updateOffset}
                key={index}
              />
            );
          })}
          <ConfigMenu
            updateAllEnabled={updateAllEnabled}
            updateAllInverted={updateAllInverted}
            updateAllFrequencies={updateAllFrequencies}
            updateAllOffsets={updateAllOffsets}
            sendStreamUpdate={sendStreamUpdate}
          />
        </Grid>
      </Grid>

      {/*<InfoBox />*/}
    </div>
  );
}
