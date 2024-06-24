import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemText } from '@mui/material';

export default function KeteranganUsahaDetail({ rows }) {
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
              <ListItemText primary="Tanggal" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.tanggal} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="NIB" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.NIB} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Jenis Usaha" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.jenisUsaha} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Alamat Usaha" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.alamatUsaha} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Nomor WA" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.nomorHp} />
            </Grid>
          </Grid>
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
      </React.Fragment>
    </List>
  );
}

KeteranganUsahaDetail.propTypes = {
  rows: PropTypes.any,
};
