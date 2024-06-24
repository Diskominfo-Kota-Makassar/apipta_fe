import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemText } from '@mui/material';

export default function RegisterMenikah({ rows }) {
  return (
    <List>
      <React.Fragment key={rows.id}>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Nama Calon Istri" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.namaCalonIstri} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Alamat Calon Istri" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.alamatCalonIstri} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Tempat Lahir Calon Istri" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.tempatLahirCalonIstri} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Tangal Lahir Calon Istri" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.tanggalLahirCalonIstri} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Pekerjaan Calon Istri" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.pekerjaanCalonIstri} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Nama Calon Suami" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.namaCalonSuami} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Alamat Calon Suami" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.alamatCalonSuami} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Tempat Lahir Calon Suami" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.tempatLahirCalonSuami} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Tangal Lahir Calon Suami" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.tanggalLahirCalonSuami} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Pekerjaan Calon Suami" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.pekerjaanCalonSuami} />
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

RegisterMenikah.propTypes = {
  rows: PropTypes.any,
};
