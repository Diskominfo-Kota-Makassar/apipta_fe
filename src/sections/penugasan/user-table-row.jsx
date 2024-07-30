import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
import { deletePenugasan, getUsersFromAPI, postSubmitPenugasan } from 'src/utils/api';
import { LocalizationProvider } from '@mui/x-date-pickers';
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

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

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
    const selectedOption = obrikList.find((option) => option.id === event.target.value);
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

  const handlePostPenugasan = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await postSubmitPenugasan({
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
        <TableCell />
        <TableCell align="right">
          <IconButton onClick={handleClickOpenDialog}>
            <Iconify icon="material-symbols:delete-outline" />
          </IconButton>
          <IconButton onClick={handleOpenDialogEdit}>
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
      <Dialog
        open={handleOpenDialogEdit}
        onClose={handleCloseDialogEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Detail Pengujian</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CardContent>
              <form>
                <Stack spacing={2}>
                  <TextField name="no" label="NO.ST" value={allData.no} />
                  <DatePicker label="Tgl.ST" name="tgl" value={allData.tgl} />
                  <TextField name="uraian" label="Uraian ST" value={allData.uraian} />
                  {/* <DatePicker label="Tanggal Mulai" name="tgl_mulai" value={allData.tgl_mulai} /> */}
                  {/* <DatePicker
                    label="Tanggal Berakhir"
                    name="tgl_berakhir"
                    value={allData.tgl_berakhir}
                  /> */}
                  <FormControl fullWidth>
                    <InputLabel>Pilih PJ</InputLabel>
                    <Select value={allData.pj_id} label="Pilih PJ" onChange={handleChangePj}>
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
                    <Select value={allData.wpj_id} label="Pilih WPJ" onChange={handleChangeWpj}>
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
                    <Select
                      value={allData.dalnis_id}
                      label="Pilih Dalnis"
                      onChange={handleChangeDalnis}
                    >
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
                    <Select value={allData.kt_id} label="Pilih KT" onChange={handleChangeKt}>
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
                      value={allData.at}
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
                    <Select
                      label="Melibatkan QA BPKP"
                      value={allData.bpkp}
                      onChange={handleChangeBpkp}
                    >
                      <MenuItem value="ya">Ya</MenuItem>
                      <MenuItem value="tidak">Tidak</MenuItem>
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
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Stack>
              </form>
            </CardContent>
          </LocalizationProvider>
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
