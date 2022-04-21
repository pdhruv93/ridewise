import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Details from '../../components/Details';
import SearchRoutes from '../../components/SearchRoutes';
import RouteAdder from '../../components/RouteAdder';

export default function HomeScreen() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={7}>
        <Grid item xs={12} md={5}>
          <Details />
        </Grid>
        <Grid item xs={12} md={7}>
          <SearchRoutes />
        </Grid>
        <Grid item xs={12} md={5} sx={{ mb: 15 }}>
          <RouteAdder />
        </Grid>
      </Grid>
    </Box>
  );
}
