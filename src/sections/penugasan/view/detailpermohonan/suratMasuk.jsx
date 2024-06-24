import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemText } from '@mui/material';

export default function SuratMasuk({ rows }) {
  return (
    <List>
      <React.Fragment key={rows.id}>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Nama Instansi Pengirim" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.namaInstansiPengirim} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Nomor Surat" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.nomorSurat} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Penanggungjawab" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.penanggungjawab} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Perihal" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.perihal} />
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

SuratMasuk.propTypes = {
  rows: PropTypes.any,
};
