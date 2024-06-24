import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemText } from '@mui/material';

export default function SerbaSerbi({ rows }) {
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

SerbaSerbi.propTypes = {
  rows: PropTypes.any,
};
