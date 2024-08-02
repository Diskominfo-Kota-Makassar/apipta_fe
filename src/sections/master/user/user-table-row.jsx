import { useState, useEffect } from 'react';
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
  Grid,
  Stack,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  FormControl,
} from '@mui/material';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { deleteUser, putSubmitUser, getRolesFromAPI, putSubmitPassword } from 'src/utils/api';
// import { id } from 'date-fns/locale';
import entitasList from './view/entitas.json';
import golonganList from './view/golongan.json';

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
  allData,
}) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const [golongan, setGolongan] = useState('');
  const [jabatanList, setJabatanList] = useState([{}]);
  const [jabatan, setJabatan] = useState('');
  const [entitasFromApi, setEntitasFromApi] = useState('');

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
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogEditPass, setOpenDialogEditPass] = useState(false);

  const handleOpenDialogEdit = () => {
    setOpenDialogEdit(true);
  };
  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleClickOpenDialogEditPass = () => {
    setOpenDialogEditPass(true);
  };

  const handleCloseDialogEditPass = () => {
    setOpenDialogEditPass(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeGolongan = (event) => {
    setGolongan(event.target.value);
  };

  const handleChangeJabatan = (event) => {
    setJabatan(event.target.value);
  };
  const handleChangeEntitas = (event) => {
    setEntitasFromApi(event.target.value);
  };

  const handleRolesFromAPI = async () => {
    const roles = await getRolesFromAPI();
    setJabatanList(roles.data);
  };

  const handlePutPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const now = new Date();

    const res = await putSubmitPassword({
      id_user: form.get('id_user'),
      password: form.get('password'),
    });

    if (res.status === 200) {
      setLoading(false);
      setOpenDialogEditPass(false);
      notify('Berhasil Update Password');
    } else {
      setLoading(false);
      notify('Gagal Update Password');
    }
  };
  const handlePutUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const now = new Date();

    const res = await putSubmitUser({
      id_user: form.get('id_user'),
      nama: form.get('nama'),
      username: form.get('username'),
      // password: form.get('password'),
      role_id: form.get('jabatan'),
      entitas: form.get('entitas'),
      masa_berlaku: now,
      email: form.get('email'),
      nip: form.get('nip'),
      golongan: form.get('golongan'),
      jabatan: form.get('jabatan'),
    });

    if (res.status === 200) {
      setLoading(false);
      setOpenDialogEdit(false);
      notify('Berhasil Update User');
    } else {
      setLoading(false);
      notify('Gagal Update User');
    }
  };

  useEffect(() => {
    handleRolesFromAPI();
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell />
        <TableCell align="center">{index}</TableCell>

        <TableCell>{nama}</TableCell>
        <TableCell>{username}</TableCell>
        <TableCell>{entitas}</TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{nip}</TableCell>
        <TableCell align="center">{catatan}</TableCell>

        <TableCell align="center">
          <IconButton onClick={handleClickOpenDialog}>
            <Iconify icon="material-symbols:delete-outline" />
          </IconButton>
          <IconButton onClick={handleClickOpenDialogEditPass}>
            <Iconify icon="material-symbols:password" />
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
      <Dialog
        open={openDialogEditPass}
        onClose={handleCloseDialogEditPass}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">EDIT PASSWORD</DialogTitle>
        <DialogContent>
          <CardContent>
            <form onSubmit={handlePutPassword}>
              <Stack spacing={2}>
                <TextField
                  name="id_user"
                  value={allData.id}
                  label="id user"
                  sx={{ display: 'none' }}
                />
                <TextField name="password" label="Password" />
                <Grid>
                  <Button variant="contained" onClick={handleCloseDialogEditPass}>
                    Batal
                  </Button>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Stack>
            </form>
          </CardContent>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialogEdit}
        onClose={handleCloseDialogEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">EDIT USER</DialogTitle>
        <DialogContent>
          <CardContent>
            <form onSubmit={handlePutUser}>
              <Stack spacing={2}>
                <TextField
                  name="id_user"
                  value={allData.id}
                  label="id user"
                  sx={{ display: 'none' }}
                />
                <TextField name="nama" defaultValue={allData.nama} label="Nama" />
                <TextField name="username" defaultValue={allData.username} label="Username" />
                {/* <TextField name="password" label="Password" /> */}
                <TextField name="email" defaultValue={allData.email} label="Email" />
                <TextField name="nip" defaultValue={allData.nip} label="NIP" />
                <FormControl fullWidth>
                  <InputLabel id="entitas">Entitas</InputLabel>
                  <Select
                    labelId="entitas"
                    name="entitas"
                    label="Entitas"
                    onChange={handleChangeEntitas}
                  >
                    {entitasList.data.map((option) => (
                      <MenuItem key={option.id} value={option.nama_entitas}>
                        {' '}
                        {option.nama_entitas}{' '}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="golongan">Golongan</InputLabel>
                  <Select
                    labelId="golongan"
                    name="golongan"
                    label="Golongan"
                    onChange={handleChangeGolongan}
                  >
                    {golonganList.data.map((option) => (
                      <MenuItem key={option.id} value={option.golongan}>
                        {' '}
                        {option.golongan}{' '}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="jabatan">Jabatan</InputLabel>
                  <Select
                    labelId="jabatan"
                    name="jabatan"
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
                <Grid>
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
  id: PropTypes.any,
  nama: PropTypes.any,
  username: PropTypes.any,
  entitas: PropTypes.any,
  masa_berlaku: PropTypes.any,
  email: PropTypes.any,
  nip: PropTypes.any,
  notify: PropTypes.any,
  catatan: PropTypes.any,
  allData: PropTypes.any,
};
