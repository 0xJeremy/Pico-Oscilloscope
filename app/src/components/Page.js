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
import { socket } from './Socket';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "6.4vh",
  },
}));

const colors = [colorRed, colorBlue, colorGreen, colorYellow];

const gen = () => {
  return Math.floor(Math.random() * (100 - -100 + 1)) + -100;
}

export default function Page() {
  const classes = useStyles();
  const [data, setData] = React.useState({
    1: [gen(), gen(), gen(), gen(), gen(), gen(), gen()],
    2: [gen(), gen(), gen(), gen(), gen(), gen(), gen()],
    3: [gen(), gen(), gen(), gen(), gen(), gen(), gen()],
    4: [gen(), gen(), gen(), gen(), gen(), gen(), gen()]
  });
  const [enabled, setEnabled] = React.useState({1: false, 2: false, 3: false, 4: false});
  const [inverted, setInverted] = React.useState({1: false, 2: false, 3: false, 4: false});

  const updateEnabled = (pin, value) => {
    setEnabled({...enabled, [pin]: value});
    // console.log("Enabled:", enabled);
  }

  const updateInverted = (pin, value) => {
    setEnabled({...inverted, [pin]: value});
    // console.log("Inverted:", inverted);
  }

  // socket.on('data', (data) => {
  //   console.log("New socket data!", data);
  // });

  return (
    <div>
      <AppBar>
        <ToolBar />
      </AppBar>

      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={9}>
          <LivePlot data={data}/>
        </Grid>

        <Grid item xs={3}>
          {colors.map((value, index) => {
            return <Channel channelNumber={index+1} channelColor={value} enabled={enabled} updateEnabled={updateEnabled} inverted={inverted} updateInverted={updateInverted} />
          })}
          <ConfigMenu />
        </Grid>
      </Grid>

      {/*<InfoBox />*/}
    </div>
  );
}
