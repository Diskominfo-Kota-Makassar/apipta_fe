import * as React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemText } from '@mui/material';

export default function KeteranganBelumMenikahDetail({ rows }) {
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
              <ListItemText primary="Tempat Lahir" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.tmp_lahir} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Tanggal Lahir" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.tgl_lahir} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Pekerjaan" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.pekerjaan} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Tanggal" />
            </Grid>
            <Grid item>
              <ListItemText
                primary={rows.tanggal !== '' ? format(new Date(rows.tanggal), 'dd/MM/yyyy') : ''}
              />
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
        {/* <Divider variant="inset" component="li" /> */}
      </React.Fragment>
    </List>
  );
}

KeteranganBelumMenikahDetail.propTypes = {
  rows: PropTypes.any,
};
