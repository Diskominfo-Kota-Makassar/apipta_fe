import { useState } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { useTheme } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
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
import { deletePenugasan, getPenugasanFromAPI } from 'src/utils/api';
// ----------------------------------------------------------------------

export default function UserTableRow({
  index,
  id,
  no_st,
  tgl_st,
  uraian,

  allData,
  notify,
}) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handleDeletePenugasan = async (event) => {
    setOpenDialog(false);

    const res = await deletePenugasan(id);

    if (res.status === 200) {
      setLoading(false);
      window.location.reload();
      notify('Berhasil Menghapus Penugasan');
    } else {
      setLoading(false);
      notify('Gagal Menghapus Penugasan');
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

        <TableCell>{index}</TableCell>
        <TableCell>{no_st}</TableCell>

        <TableCell>{tgl_st}</TableCell>

        <TableCell>{uraian}</TableCell>

        <TableCell>
          <Switch onClick={() => router.push('/permintaan/validasi-permintaan')} {...label} />
        </TableCell>
        <TableCell align="right">
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
            Yakin ingin menghapus penugasan ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleDeletePenugasan} autoFocus>
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
  no_st: PropTypes.any,
  id: PropTypes.any,
  tgl_st: PropTypes.any,
  uraian: PropTypes.any,
  allData: PropTypes.any,
  notify: PropTypes.any,
};
