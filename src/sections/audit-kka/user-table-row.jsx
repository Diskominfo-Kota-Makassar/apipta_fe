import { useState } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { useTheme } from '@mui/material/styles';
import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

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
import { deleteAudit } from 'src/utils/api';
// ----------------------------------------------------------------------

export default function UserTableRow({
  index,
  id,
  no_ref_kka,
  no_ref_pka,
  uraian,
  notify,
  allData,
}) {
  const theme = useTheme();
  const user = useLocalStorage('user');
  const [loading, setLoading] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

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

    const res = await deleteAudit(id);

    if (res.status === 200) {
      setLoading(false);
      window.location.reload();
      notify('Berhasil Menghapus Audit');
    } else {
      setLoading(false);
      notify('Gagal Menghapus Audit');
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSession = () => {
    console.log(allData);
    if (user[0].role_id === 3) {
      return navigate('/audit-kka/anggota-tim', { state: allData });
    }
    if (user[0].role_id === 2) {
      if (allData.catatan_wpj === null) {
        return navigate('/audit-kka/ketua-tim', { state: allData });
      }
      if (allData.wpj !== '') {
        return navigate('/audit-kka/wpj', { state: allData });
      }
    }
    if (user[0].role_id === 4) {
      return navigate('/audit-kka/wpj', { state: allData });
    }
    if (user[0].role_id === 5) {
      return navigate('/audit-kka/obrik', { state: allData });
    }
    if (user[0].role_id === 6) {
      return navigate('/audit-kka/bpkp', { state: allData });
    }
    if (user[0].role_id === 7) {
      return navigate('/audit-kka/pj', { state: allData });
    }
    if (user[0].role_id === 8) {
      return navigate('/audit-kka/dalnis', { state: allData });
    }
    return () => {};
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell />

        <TableCell>{index}</TableCell>
        <TableCell>{no_ref_kka}</TableCell>

        <TableCell>{no_ref_pka}</TableCell>

        <TableCell>{uraian}</TableCell>

        <TableCell>
          <Button variant="contained" color="success" onClick={handleSession}>
            LIHAT KKA
          </Button>
        </TableCell>

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
            Yakin ingin menghapus kka?
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
  id: PropTypes.any,
  no_ref_kka: PropTypes.any,
  no_ref_pka: PropTypes.any,
  uraian: PropTypes.any,
  allData: PropTypes.any,
  notify: PropTypes.any,
};
