import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemText } from '@mui/material';

export default function KeteranganKewarisanDetail({ rows }) {
  return (
    <List>
      <React.Fragment key={rows.id}>
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
              <ListItemText primary="Pewaris" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.pewaris} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Tempat Meninggal" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.tempatMeninggal} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Tanggal Meninggal" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.tanggalMeninggal} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Grid container spacing={2}>
            <Grid item>
              <ListItemText primary="Ahli Waris" />
            </Grid>
            <Grid item>
              <ListItemText primary={rows.ahliWaris} />
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
        {/* <Divider variant="inset" component="li" /> */}
      </React.Fragment>
    </List>
  );
}

KeteranganKewarisanDetail.propTypes = {
  rows: PropTypes.any,
};
