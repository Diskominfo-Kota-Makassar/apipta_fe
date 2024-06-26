import { useState, useEffect, useCallback } from 'react';
import { TextField, CircularProgress, Select, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast, ToastContainer } from 'react-toastify';
import { getUsersFromAPI, postSubmitPenugasan } from 'src/utils/api';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';

import Iconify from 'src/components/iconify';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import 'react-toastify/dist/ReactToastify.css';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

export default function TambahPenugasan() {
  const notify = (comment) => toast(comment);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [pj, setPj] = useState('');
  const [wpj, setWpj] = useState('');
  const [dalnis, setDalnis] = useState('');
  const [kt, setKt] = useState('');
  const [at, setAt] = useState([]);

  const [pjList, setPjList] = useState([]);
  const [wpjList, setWpjList] = useState([]);
  const [dalnisList, setDalnisList] = useState([]);
  const [ktList, setKtList] = useState([]);
  const [atList, setAtList] = useState([]);

  const [bpkp, setBpkp] = useState('');

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
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
  const handleChangeAt = (event) => {
    const {
      target: { value },
    } = event;
    setAt(
      // On autofill we get a stringified value.
      typeof value === 'number' ? value.split(',') : value
    );
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
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
      if (user.role_id === 2) {
        setKtList((prevKtList) => [...prevKtList, user]);
      }
      if (user.role_id === 3) {
        setAtList((prevAtList) => [...prevAtList, user]);
      }
    });
  }, []);

  useEffect(() => {
    handleUsersFromAPI();
  }, [handleUsersFromAPI]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Tambah Penugasan</Typography>

        <Button
          variant="contained"
          onClick={() => window.history.back()}
          color="inherit"
          startIcon={<Iconify icon="icon-park-outline:back" />}
        >
          Kembali
        </Button>
      </Stack>

      <ToastContainer position="top-center" />

      <Stack>
        <Card>
          <Grid container>
            <Grid item sm={12} md={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CardContent>
                  <form onSubmit={handlePostPenugasan}>
                    <Stack spacing={2}>
                      <TextField name="no" label="NO.ST" />
                      <DatePicker label="Tgl.ST" name="tgl" />
                      <TextField name="uraian" label="Uraian ST" />
                      <DatePicker label="Tanggal Mulai" name="tgl_mulai" />
                      <DatePicker label="Tanggal Berakhir" name="tgl_berakhir" />
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
                          renderValue={(selected) => selected.join(', ')}
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
                        <Select label="Melibatkan QA BPKP" onChange={handleChangeBpkp}>
                          <MenuItem value="ya">Ya</MenuItem>
                          <MenuItem value="tidak">Tidak</MenuItem>
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
            </Grid>
          </Grid>
        </Card>
      </Stack>
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
    </Container>
  );
}
