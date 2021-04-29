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
import { socket } from "./Socket";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "6.4vh",
  },
}));

const colors = [colorRed, colorBlue, colorGreen, colorYellow];

const gen = () => Math.floor(Math.random() * 101);

export default function Page() {
  const classes = useStyles();
  const maxDataSet = 60;
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
    0: gen(),
    1: gen(),
    2: gen(),
    3: gen(),
  });
  const [offset, setOffset] = React.useState({
    0: gen(),
    1: gen(),
    2: gen(),
    3: gen(),
  });

  const updateEnabled = (pin, value) => {
    setEnabled({ ...enabled, [pin]: value });
    socket.emit("updateEnabled", enabled);
  };

  const updateInverted = (pin, value) => {
    setInverted({ ...inverted, [pin]: value });
    socket.emit("updateInverted", inverted);
  };

  const updateFrequency = (pin, value, sendUpdate) => {
    setFrequency({ ...frequency, [pin]: value });
    if (sendUpdate) {
      socket.emit("updateFrequency", frequency);
    }
  };

  const updateOffset = (pin, value, sendUpdate) => {
    setOffset({ ...offset, [pin]: value });
    if (sendUpdate) {
      socket.emit("updateoffset", offset);
    }
  };

  React.useEffect(() => {
    socket.on("data", (newData) => {
      setData((data) => {
        if (data[0].length >= maxDataSet) {
          return {
            0: [newData[0]],
            1: [newData[1]],
            2: [newData[2]],
            3: [newData[3]],
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
                channelNumber={index}
                channelColor={value}
                enabled={enabled}
                updateEnabled={updateEnabled}
                inverted={inverted}
                updateInverted={updateInverted}
                frequency={frequency}
                updateFrequency={updateFrequency}
                offset={offset}
                updateOffset={updateOffset}
                key={index}
              />
            );
          })}
          <ConfigMenu />
        </Grid>
      </Grid>

      {/*<InfoBox />*/}
    </div>
  );
}
