import React from 'react';
import Grid from '@material-ui/core/Grid';
import Plot from './Plot';
import DataTable from './DataTable';
import TopMenu from './TopMenu';
import MiddleMenu from './MiddleMenu';
import BottomMenu from './BottomMenu';
import TogglePanel from './TogglePanel';
import InfoBox from './InfoBox';

export default function Page() {

  return (
    <div>
      <Grid container spacing={0}>

        <Grid item xs={9}>
          <Plot />

          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TogglePanel />
            </Grid>

            <Grid item xs={9}>
              <DataTable  />
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
