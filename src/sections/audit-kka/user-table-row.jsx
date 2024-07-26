import { useState } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { useTheme } from '@mui/material/styles';
import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

import { MuiFileInput } from 'mui-file-input';

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
  Stack,
  TextField,
  ListItem,
  Grid,
  Typography,
  CardContent,
} from '@mui/material';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { deleteAudit, fileBaseURL } from 'src/utils/api';
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
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleOpenDialogEdit = () => {
    setOpenDialogEdit(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const handleSession = () => {
    console.log(allData);
    if (user[0].role_id === 3) {
      return navigate('/audit-kka/anggota-tim', { state: allData });
    }
    if (user[0].role_id === 2) {
      if (allData.catatan_wpj === null || '') {
        return navigate('/audit-kka/ketua-tim', { state: allData });
      }
      if (allData.catatan_wpj !== null && allData.bpkp === null) {
        return navigate('/audit-kka/ketua-tim-review-1', { state: allData });
      }
      if (allData.bpkp !== null) {
        return navigate('/audit-kka/ketua-tim-review-2', { state: allData });
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
            EDIT KKA
          </Button>
        </TableCell>

        <TableCell align="center">
          <IconButton onClick={handleClickOpenDialog}>
            <Iconify icon="material-symbols:delete-outline" />
          </IconButton>
          <IconButton onClick={handleOpenDialogEdit}>
            <Iconify icon="tabler:eye" />
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
      <Dialog
        open={openDialogEdit}
        onClose={handleCloseDialogEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Detail Pengujian</DialogTitle>
        <DialogContent>
          <CardContent>
            <form>
              <Stack spacing={2}>
                <TextField name="id_audit" value={allData.id} label="ID KKA" />
                <TextField value={allData.no_ref_kka} label="No.Ref KKA" />
                <TextField value={allData.no_ref_pka} label="No.Ref PKA" />
                <TextField value={allData.judul} label="Judul Pengujian" />
                <Typography variant="button" sx={{ marginBottom: 2 }}>
                  List File hasil pengujian
                </Typography>
                {allData.hasil_pengujian !== null &&
                  allData.hasil_pengujian.map((fileName, i) => (
                    <Button
                      key={i}
                      variant="outlined"
                      onClick={() =>
                        window.open(`${fileBaseURL}/file/inspektorat/${fileName}`, '_blank')
                      }
                      sx={{ marginBottom: 1 }}
                    >
                      Lihat {fileName}
                    </Button>
                  ))}
                <Button
                  variant="contained"
                  disabled={allData.file_bukti_dukung === null}
                  onClick={
                    allData.file_bukti_dukung !== null &&
                    (() =>
                      window.open(
                        `${fileBaseURL}/file/inspektorat/${allData.file_bukti_dukung}`,
                        '_blank'
                      ))
                  }
                >
                  {' '}
                  {allData.file_bukti_dukung !== null
                    ? 'Lihat Dokumen Bukti Dukung Audit'
                    : 'File Bukti Dukung Belum di Upload'}
                </Button>
                <TextField
                  multiline
                  rows={4}
                  name="catatan_anggota_tim"
                  value={
                    allData.catatan_review !== null
                      ? allData.catatan_review
                      : 'Belum diisi anggota tim'
                  }
                  label="Catatan Anggota Tim"
                />
                <Button
                  variant="contained"
                  disabled={allData.file_bukti_dukung === null}
                  onClick={() =>
                    window.open(
                      `${fileBaseURL}/file/inspektorat/${allData.file_kesimpulan}`,
                      '_blank'
                    )
                  }
                >
                  {allData.file_kesimpulan !== null
                    ? 'Lihat File Kesimpulan'
                    : 'File Kesimpulan Belum di Upload'}
                </Button>
                <TextField
                  multiline
                  rows={4}
                  name="catatan_review_ketua"
                  label="Catatan Review Ketua Tim"
                  value={allData.tim_ketua !== null ? allData.tim_ketua : 'Belum di isi ketua tim'}
                />
                <TextField
                  multiline
                  rows={4}
                  value={allData.dalnis !== null ? allData.dalnis : 'Belum di isi dalnis'}
                  label="Catatan Review Dalnis"
                />
                <TextField
                  multiline
                  rows={4}
                  value={allData.catatan_wpj !== null ? allData.catatan_wpj : 'Belum di isi WPJ'}
                  label="Catatan Review WPJ"
                />
                <TextField
                  multiline
                  rows={4}
                  value={allData.bpkp !== null ? allData.bpkp : 'Belum di isi BPKP (Eksternal)'}
                  label="Catatan BPKP (Eksternal)"
                />
                <TextField
                  multiline
                  rows={4}
                  name="pj"
                  value={allData.pj !== null ? allData.pj : 'Belum di isi PJ'}
                  label="Catatan Review PJ"
                />
              </Stack>
            </form>
          </CardContent>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDialogEdit}>
            Keluar
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
