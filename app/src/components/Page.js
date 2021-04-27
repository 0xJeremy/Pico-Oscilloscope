import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import ToolBar from "./ToolBar";
import LivePlot from "./LivePlot";
import Channel from "./Channel";
import InfoBox from "./InfoBox";
import ConfigMenu from "./ConfigMenu";
import { colorOrange, colorRed, colorBlue, colorGreen, colorYellow } from './PageStyles';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "6.4vh",
  },
}));

export default function Page() {
  const classes = useStyles();

  return (
    <div>
      <AppBar>
        <ToolBar />
      </AppBar>

      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={9}>
          <LivePlot />
        </Grid>

        <Grid item xs={3}>
          <Channel channelNumber="1" channelColor={colorRed} />
          <Channel channelNumber="2" channelColor={colorBlue} />
          <Channel channelNumber="3" channelColor={colorGreen} />
          <Channel channelNumber="4" channelColor={colorYellow} />
          <ConfigMenu />
        </Grid>
      </Grid>

      {/*<InfoBox />*/}
    </div>
  );
}
