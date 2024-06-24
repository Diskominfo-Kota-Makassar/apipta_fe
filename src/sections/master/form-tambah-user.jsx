import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { TextField, CircularProgress } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';

import { Icon } from '@iconify/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Iconify from 'src/components/iconify';
import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { getRolesFromAPI, postSubmitUser } from 'src/utils/api';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { renderBooleanCell } from '@mui/x-data-grid';

// ----------------------------------------------------------------------

export default function FormTambahUser() {
  const notify = (comment) => toast(comment);

  const [listLayanan, setListLayanan] = useState([{ id: 1, nama: 'Buku Tamu' }]);
  const [namaLayanan, setNamaLayanan] = useState('Buku Tamu');

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [golongan, setGolongan] = React.useState('');
  const [jabatanList, setJabatanList] = React.useState([{}]);
  const [jabatan, setJabatan] = React.useState('');
  const [entitas, setEntitas] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeGolongan = (event) => {
    setGolongan(event.target.value);
  };

  const handleChangeJabatan = (event) => {
    setJabatan(event.target.value);
  };
  const handleChangeEntitas = (event) => {
    setEntitas(event.target.value);
  };

  const handleRolesFromAPI = async () => {
    const roles = await getRolesFromAPI();
    setJabatanList(roles.data);
  };

  const handleSubmitUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await postSubmitUser({
      nama: form.get('nama'),
      username: form.get('username'),
      password: form.get('password'),
      role_id: jabatan,
      entitas,
      masa_berlaku: form.get('masa_berlaku'),
      email: form.get('email'),
      nip: form.get('nip'),
      golongan,
      jabatan,
    });

    console.log(res);

    if (res.status === 201) {
      setLoading(false);
      window.location.reload();
      notify('Berhasil Menambahkan');
    } else {
      setLoading(false);
      notify('Gagal Menambahkan');
    }
  };

  useEffect(() => {
    handleRolesFromAPI();
  }, []);

  const renderBukuTamu = (
    <CardContent>
      <form onSubmit={handleSubmitUser}>
        <Stack spacing={2}>
          <TextField name="nama" label="Nama" />
          <TextField name="username" label="Username" />
          <TextField name="password" label="Password" />
          <FormControl fullWidth>
            <InputLabel id="entitas">Entitas</InputLabel>
            <Select
              labelId="entitas"
              value={entitas}
              label="Entitas"
              onChange={handleChangeEntitas}
            >
              <MenuItem value="Entitas A">Entitas A</MenuItem>
              <MenuItem value="Entitas B">Entitas B</MenuItem>
              <MenuItem value="Entitas C">Entitas C</MenuItem>
            </Select>
          </FormControl>
          <DatePicker label="Masa Berlaku" name="masa_berlaku" />
          <TextField name="email" label="Email" />
          <TextField name="nip" label="NIP" />
          <FormControl fullWidth>
            <InputLabel id="golongan">Golongan</InputLabel>
            <Select
              labelId="golongan"
              value={golongan}
              label="Golongan"
              onChange={handleChangeGolongan}
            >
              <MenuItem value="Golongan A">Golongan A</MenuItem>
              <MenuItem value="Golongan B">Golongan B</MenuItem>
              <MenuItem value="Golongan C">Golongan C</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="jabatan">Jabatan</InputLabel>
            <Select
              labelId="jabatan"
              value={jabatan}
              label="Jabatan"
              onChange={handleChangeJabatan}
            >
              {jabatanList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {' '}
                  {option.name}{' '}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container justifyContent="flex-end">
            <Button variant="contained" type="submit">
              SIMPAN
            </Button>
          </Grid>
        </Stack>
      </form>
    </CardContent>
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Tambah User</Typography>

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
                {renderBukuTamu}
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
