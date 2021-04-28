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

export default function Page() {
  const classes = useStyles();
  const maxDataSet = 60;
  const [data, setData] = React.useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });
  const [enabled, setEnabled] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [inverted, setInverted] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const updateEnabled = (pin, value) => {
    setEnabled({ ...enabled, [pin]: value });
    // console.log("Enabled:", enabled);
  };

  const updateInverted = (pin, value) => {
    setEnabled({ ...inverted, [pin]: value });
    // console.log("Inverted:", inverted);
  };

  React.useEffect(() => {
    socket.on('data', (newData) => {
      setData((data) => {
        if (data[1].length >= maxDataSet) {
          return ({
            1: [newData[0]],
            2: [newData[1]],
            3: [newData[2]],
            4: [newData[3]],
          });
        }
        else {
          return ({
            1: data[1].concat(newData[0]),
            2: data[2].concat(newData[1]),
            3: data[3].concat(newData[2]),
            4: data[4].concat(newData[3]),
          });
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
                channelNumber={index + 1}
                channelColor={value}
                enabled={enabled}
                updateEnabled={updateEnabled}
                inverted={inverted}
                updateInverted={updateInverted}
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
