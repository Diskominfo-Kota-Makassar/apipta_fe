import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from '@mui/material';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  index,
  username,
  email,
  nip,
  catatan,
  entitas,
  nama,
  masa_berlaku,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell />
        <TableCell align="center">{index}</TableCell>

        <TableCell>{nama}</TableCell>
        <TableCell>{username}</TableCell>
        <TableCell>{entitas}</TableCell>

        <TableCell>{masa_berlaku}</TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{nip}</TableCell>
        <TableCell align="center">{catatan}</TableCell>

        <TableCell align="center">
          <IconButton onClick={handleOpen}>
            <Iconify icon="material-symbols:delete-outline" />
          </IconButton>
          <IconButton onClick={handleOpen}>
            <Iconify icon="tabler:edit" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

UserTableRow.propTypes = {
  index: PropTypes.any,
  nama: PropTypes.any,
  username: PropTypes.any,
  entitas: PropTypes.any,
  masa_berlaku: PropTypes.any,
  email: PropTypes.any,
  nip: PropTypes.any,
  catatan: PropTypes.any,
};
