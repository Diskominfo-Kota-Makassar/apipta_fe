import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';

import { toast, ToastContainer } from 'react-toastify';

import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  MenuItem,
  DialogActions,
  CircularProgress,
  Grid,
  Select,
  InputLabel,
  FormControl,
  ListItemText,
  Checkbox,
  CardContent,
  OutlinedInput,
} from '@mui/material';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { deletePenugasan, getUsersFromAPI, putSubmitPenugasan } from 'src/utils/api';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

export default function UserTableRow({
  index,
  id,
  no,
  tgl,
  uraian,
  pj_id,
  tgl_mulai,
  tgl_berakhir,
  allData,
  notify,
}) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [userLocal, setUser] = useLocalStorage('user');

  // const notify = (comment) => toast(comment);

  const [pj, setPj] = useState('');
  const [wpj, setWpj] = useState('');
  const [dalnis, setDalnis] = useState('');
  const [kt, setKt] = useState('');
  const [obrik, setObrik] = useState('');
  const [obrikName, setObrikName] = useState('');
  const [at, setAt] = useState([]);

  const [pjList, setPjList] = useState([]);
  const [wpjList, setWpjList] = useState([]);
  const [dalnisList, setDalnisList] = useState([]);
  const [ktList, setKtList] = useState([]);
  const [atList, setAtList] = useState([]);
  const [obrikList, setObrikList] = useState([]);

  const [bpkp, setBpkp] = useState('');

  const [tglST, setTglST] = useState('');

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleChangeBpkp = (event) => {
    setBpkp(event.target.value);
  };

  const handleChangePj = (event) => {
    setPj(event.target.value);
  };
  const handleChangeWpj = (event) => {
    setWpj(event.target.value);
  };
  const handleChangeDalnis = (event) => {
    setDalnis(event.target.value);
  };
  const handleChangeKt = (event) => {
    setKt(event.target.value);
  };
  const handleChangeObrik = (event) => {
    setObrik(event.target.value);
  };
  const handleChangeAt = (event) => {
    const {
      target: { value },
    } = event;

    setAt(
      // On autofill we get a stringified value.
      typeof value === 'number' ? value.split(',') : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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
      // window.location.reload();
      notify('Berhasil Menghapus Penugasan');
    } else {
      setLoading(false);
      notify('Gagal Menghapus Penugasan');
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialogEdit = () => {
    setOpenDialogEdit(true);
  };
  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const handlePutPenugasan = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await putSubmitPenugasan({
      id_penugasan: form.get('id_penugasan'),
      no: form.get('no'),
      tgl: form.get('tgl'),
      uraian: form.get('uraian'),
      tgl_mulai: form.get('tgl_mulai'),
      tgl_berakhir: form.get('tgl_berakhir'),
      pj_id: pj,
      wpj_id: wpj,
      dalnis_id: dalnis,
      kt_id: kt,
      tim_id: at,
      bpkp,
      obrik_id: obrik,
    });

    console.log(res.status);
    console.log(res);

    if (res.status === 200) {
      console.log('masuk sukses');
      setOpenDialogEdit(false);
      setLoading(false);
      notify('Berhasil Edit Penugasan');
    } else {
      setLoading(false);
      notify('Gagal Edit Penugasan');
    }
  };

  const handleUsersFromAPI = useCallback(async () => {
    const users = await getUsersFromAPI();
    const usersObject = await users.data;
    usersObject.forEach((user) => {
      if (user.role_id === 7) {
        setPjList((prevPjList) => [...prevPjList, user]);
      }
      if (user.role_id === 8) {
        setDalnisList((prevDalnisList) => [...prevDalnisList, user]);
      }
      if (user.role_id === 4) {
        setWpjList((prevWpjList) => [...prevWpjList, user]);
      }
      if (user.role_id === 5) {
        setObrikList((prevObrikList) => [...prevObrikList, user]);
      }
      if (user.role_id === 2) {
        setKtList((prevKtList) => [...prevKtList, user]);
      }
      if (user.role_id === 3) {
        setAtList((prevAtList) => [...prevAtList, user]);
      }
    });
  }, []);

  const getUserNameById = (idU) => {
    const user = atList.find((usr) => usr.id === idU);
    return user ? user.nama : '';
  };

  useEffect(() => {
    handleUsersFromAPI();
  }, [handleUsersFromAPI]);

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell />

        <TableCell>{index}</TableCell>
        <TableCell>{no}</TableCell>

        <TableCell>{tgl}</TableCell>

        <TableCell>{uraian}</TableCell>
        <TableCell>{pj_id}</TableCell>
        <TableCell>{tgl_mulai}</TableCell>
        <TableCell>{tgl_berakhir}</TableCell>
        {/* <TableCell /> */}
        {(userLocal.role_id === 1 || userLocal.role_id === 2) && (
          <TableCell align="right">
            <IconButton onClick={handleClickOpenDialog}>
              <Iconify icon="material-symbols:delete-outline" />
            </IconButton>
            <IconButton onClick={handleOpenDialogEdit}>
              <Iconify icon="tabler:edit" />
            </IconButton>
          </TableCell>
        )}
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
      <Dialog
        open={openDialogEdit}
        onClose={handleCloseDialogEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Detail Penugasan</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CardContent>
              <form onSubmit={handlePutPenugasan}>
                <Stack spacing={2}>
                  <TextField
                    name="id_penugasan"
                    label="ID"
                    value={allData.id}
                    sx={{ display: 'none' }}
                  />
                  <TextField name="no" label="NO.ST" value={allData.no} />
                  <DatePicker
                    label="Tgl.ST"
                    defaultValue={dayjs(allData.tgl)}
                    onChange={(newValue) => setTglST(newValue)}
                    name="tgl"
                  />
                  <TextField name="uraian" label="Uraian ST" defaultValue={allData.uraian} />
                  <DatePicker
                    label="Tanggal Mulai"
                    name="tgl_mulai"
                    value={dayjs(allData.tgl_mulai)}
                  />
                  <DatePicker
                    label="Tanggal Berakhir"
                    name="tgl_berakhir"
                    value={dayjs(allData.tgl_berakhir)}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Pilih PJ</InputLabel>
                    <Select value={pj} label="Pilih PJ" onChange={handleChangePj}>
                      {pjList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {' '}
                          {option.nama}{' '}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Pilih WPJ</InputLabel>
                    <Select value={wpj} label="Pilih WPJ" onChange={handleChangeWpj}>
                      {wpjList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {' '}
                          {option.nama}{' '}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Pilih Dalnis</InputLabel>
                    <Select value={dalnis} label="Pilih Dalnis" onChange={handleChangeDalnis}>
                      {dalnisList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {' '}
                          {option.nama}{' '}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Pilih KT</InputLabel>
                    <Select value={kt} label="Pilih KT" onChange={handleChangeKt}>
                      {ktList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {' '}
                          {option.nama}{' '}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="Pilih Anggota Tim">Pilih Anggota Tim</InputLabel>
                    <Select
                      labelId="Pilih Anggota Tim"
                      id="Pilih Anggota Tim"
                      multiple
                      value={at}
                      onChange={handleChangeAt}
                      input={<OutlinedInput label="Pilih Anggota Tim" />}
                      renderValue={(selected) => selected.map(getUserNameById).join(', ')}
                      MenuProps={MenuProps}
                    >
                      {atList.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          <Checkbox checked={at.indexOf(user.id) > -1} />
                          <ListItemText primary={user.nama} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="golongan">Melibatkan QA BPKP</InputLabel>
                    <Select label="Melibatkan QA BPKP" value={bpkp} onChange={handleChangeBpkp}>
                      <MenuItem key="ya" value="ya">
                        Ya
                      </MenuItem>
                      <MenuItem key="tidak" value="tidak">
                        Tidak
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Pilih Obrik</InputLabel>
                    <Select
                      value={allData.obrik_id}
                      label="Pilih Obrik"
                      onChange={handleChangeObrik}
                    >
                      {obrikList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {' '}
                          {option.nama}{' '}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
  tgl: PropTypes.any,
  uraian: PropTypes.any,
  pj_id: PropTypes.any,
  tgl_mulai: PropTypes.any,
  tgl_berakhir: PropTypes.any,
  allData: PropTypes.any,
  notify: PropTypes.any,
};
