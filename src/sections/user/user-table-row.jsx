import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import IconButton from '@mui/material/IconButton';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  CircularProgress,
} from '@mui/material';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { deleteUser } from 'src/utils/api';
// import { id } from 'date-fns/locale';

// ----------------------------------------------------------------------

export default function UserTableRow({
  index,
  id,
  username,
  email,
  nip,
  catatan,
  entitas,
  nama,
  masa_berlaku,
  notify,
}) {
  const [loading, setLoading] = useState(false);
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

  const handleDeleteUser = async (event) => {
    setOpenDialog(false);

    const res = await deleteUser(id);

    if (res.status === 200) {
      setLoading(false);
      notify('Berhasil Menghapus User');
      window.location.reload();
    } else {
      setLoading(false);
      notify('Gagal Menghapus User');
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
          <IconButton onClick={handleClickOpenDialog}>
            <Iconify icon="material-symbols:delete-outline" />
          </IconButton>
          <IconButton onClick={handleOpen}>
            <Iconify icon="tabler:edit" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Yakin ingin menghapus user ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleDeleteUser} autoFocus>
            Setuju
          </Button>
        </DialogActions>
      </Dialog>
      {loading && (
        <CircularProgress
          size={48}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </>
  );
}

UserTableRow.propTypes = {
  index: PropTypes.any,
  id: PropTypes.any,
  nama: PropTypes.any,
  username: PropTypes.any,
  entitas: PropTypes.any,
  masa_berlaku: PropTypes.any,
  email: PropTypes.any,
  nip: PropTypes.any,
  notify: PropTypes.any,
  catatan: PropTypes.any,
};
