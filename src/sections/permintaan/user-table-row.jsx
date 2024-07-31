import { useState, useEffect, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'src/routes/hooks/use-router';
import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import { MuiFileInput } from 'mui-file-input';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  CircularProgress,
  CardContent,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
} from '@mui/material';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { deletePermintaan, getPenugasanFromAPI, putSubmitPermintaan } from 'src/utils/api';
// ----------------------------------------------------------------------

export default function UserTableRow({
  index,
  id,
  no,
  tgl_penugasan,
  judul_doc,
  uraian,
  no_ref_kka,
  no_ref_pka,
  status,
  upload,
  allData,
  notify,
}) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [user, setUser] = useLocalStorage('user');
  const navigate = useNavigate();

  const router = useRouter();
  const [valueFile, setValueFile] = useState(null);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [allPenugasan, setAllPenugasan] = useState([]);
  const [noST, setNoST] = useState('');
  const [tglST, setTglST] = useState('');
  const [uraianST, setUraianST] = useState('');

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handleChangeST = (event) => {
    const penugasan = allPenugasan.find((option) => option.id === event.target.value);
    setNoST(penugasan.no);
    setTglST(penugasan.tgl);
    setUraianST(penugasan.uraian);
  };

  const handleDeletePermintaan = async (event) => {
    setOpenDialog(false);
    setLoading(true);
    const res = await deletePermintaan(id);

    if (res.status === 200) {
      setLoading(false);
      notify('Berhasil Menghapus Permintaan');
      window.location.reload();
    } else {
      setLoading(false);
      notify('Gagal Menghapus Permintaan');
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const handleChangeFile = (newValue) => {
    setValueFile(newValue);
  };

  const handleOpenDialogEdit = () => {
    setOpenDialogEdit(true);
  };
  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePutPermintaan = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    console.log(form.get('id_permintaan'));

    const res = await putSubmitPermintaan({
      id_permintaan: form.get('id_permintaan'),
      no: form.get('no'),
      tgl_penugasan: form.get('tglST'),
      uraian: form.get('uraianST'),
      no_ref_kka: form.get('no_ref_kka'),
      no_ref_pka: form.get('no_ref_pka'),
      judul_doc: form.get('judul_doc'),
      ket: form.get('ket'),
      file: valueFile,
    });

    console.log(res);

    if (res.status === 201) {
      setLoading(false);
      // window.location.reload();
      notify('Berhasil Menambahkan Penugasan');
      window.history.back();
    } else {
      setLoading(false);
      notify('Gagal Menambahkan Penugasan');
    }
  };

  const handlePenugasanFromAPI = useCallback(async () => {
    try {
      const penugasan = await getPenugasanFromAPI();

      if (user.role_id === 1) {
        setAllPenugasan(penugasan.data);
        return;
      }

      if (user.surat_tugas !== '') {
        const id_surat_dipilih = user.surat_tugas;
        const penugasanTerpilih = penugasan.data.find((option) => option.id === id_surat_dipilih);
        setAllPenugasan([penugasanTerpilih]);
      } else {
        setAllPenugasan([]);
      }
    } catch (error) {
      console.error('Error fetching penugasan data:', error);
      // Handle error appropriately
    }
  }, [user]);

  console.log(allData);

  useEffect(() => {
    handlePenugasanFromAPI();
  }, [handlePenugasanFromAPI]);

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell />

        <TableCell>{index}</TableCell>
        <TableCell>{no}</TableCell>

        <TableCell>{tgl_penugasan}</TableCell>

        <TableCell>{uraian}</TableCell>
        <TableCell>{no_ref_kka}</TableCell>
        <TableCell>{no_ref_pka}</TableCell>
        <TableCell>{judul_doc}</TableCell>
        <TableCell>
          <Switch
            checked={status}
            onClick={() => navigate('/permintaan/validasi-permintaan', { state: allData })}
            {...label}
          />
          {/* <Switch
            onClick={() =>
              router.push({ pathname: '/permintaan/validasi-permintaan', query: 'aaaaa' })
            }
            {...label}
          /> */}
        </TableCell>
        {user.role_id === 1 ||
          (user.role_id === 2 && (
            <TableCell align="right">
              <IconButton onClick={handleClickOpenDialog}>
                <Iconify icon="material-symbols:delete-outline" />
              </IconButton>
              <IconButton onClick={handleOpenDialogEdit}>
                <Iconify icon="tabler:edit" />
              </IconButton>
            </TableCell>
          ))}
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
            Yakin ingin menghapus permintaan ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleDeletePermintaan} autoFocus>
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
        <DialogTitle id="alert-dialog-title">Detail Permintaan</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CardContent>
              <form onSubmit={handlePutPermintaan}>
                <Stack spacing={2}>
                  <TextField
                    name="id_permintaan"
                    value={allData.id}
                    InputProps={{
                      readOnly: true,
                    }}
                    // sx={{ display: 'none' }}
                  />
                  <TextField
                    name="no"
                    value={allData.no}
                    label="No.ST"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name="tglST"
                    value={allData.tgl_penugasan}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name="uraianST"
                    value={allData.uraian}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name="no_ref_kka"
                    label="No.Ref KKA"
                    defaultValue={allData.no_ref_kka}
                  />
                  <TextField
                    name="no_ref_pka"
                    label="No.Ref PKA"
                    defaultValue={allData.no_ref_pka}
                  />
                  <TextField
                    name="judul_doc"
                    label="Judul Dokumen"
                    defaultValue={allData.judul_doc}
                  />
                  <TextField
                    rows={4}
                    multiline
                    name="ket"
                    defaultValue={allData.ket}
                    label="Catatan/keterangan dokumen"
                  />
                  <MuiFileInput
                    name="file"
                    placeholder="Pilih File"
                    value={valueFile}
                    onChange={handleChangeFile}
                  />
                  <Grid container justifyContent="flex-end">
                    <Button variant="contained" onClick={handleCloseDialogEdit}>
                      Batal
                    </Button>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Stack>
              </form>
            </CardContent>
          </LocalizationProvider>
        </DialogContent>
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
  no: PropTypes.any,
  id: PropTypes.any,
  judul_doc: PropTypes.any,
  tgl_penugasan: PropTypes.any,
  uraian: PropTypes.any,
  no_ref_kka: PropTypes.any,
  no_ref_pka: PropTypes.any,
  status: PropTypes.any,
  upload: PropTypes.any,
  allData: PropTypes.any,
  notify: PropTypes.any,
};
