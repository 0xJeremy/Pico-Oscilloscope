import React from 'react';
import Grid from '@material-ui/core/Grid';
import LivePlot from './LivePlot';
import BottomMiddleMenu from './BottomMiddleMenu';
import TopMenu from './TopMenu';
import MiddleMenu from './MiddleMenu';
import BottomMenu from './BottomMenu';
import BottomLeftMenu from './BottomLeftMenu';
import InfoBox from './InfoBox';

export default function Page() {

  return (
    <div>
      <Grid container spacing={0}>

        <Grid item xs={9}>
          <LivePlot />

          <Grid container spacing={1}>
            <Grid item xs={3}>
              <BottomLeftMenu />
            </Grid>

            <Grid item xs={9}>
              <BottomMiddleMenu  />
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={3}>
          <TopMenu />
          <MiddleMenu />
          <BottomMenu />
        </Grid>

      </Grid>

      {/*<InfoBox />*/}

    </div>
  );
}
