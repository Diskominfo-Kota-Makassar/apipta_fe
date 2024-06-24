import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

export default function BukuTamuDetail({ rows }) {
  return (
    <List>
      <React.Fragment key={rows.id}>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Nama" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.nama} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Alamat" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.alamat} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Nomor HP" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.nomorHp} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Tujuan" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.tujuan} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Keterangan" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.keterangan} />
            </Grid>
          </Grid>
        </ListItem>
      </React.Fragment>
    </List>
  );
}

BukuTamuDetail.propTypes = {
  rows: PropTypes.any,
};
