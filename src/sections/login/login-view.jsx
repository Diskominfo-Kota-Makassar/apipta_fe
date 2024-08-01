import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { bgGradient } from 'src/theme/css';
import { useAuth } from 'src/routes/hooks/useAuth';
import useMediaQuery from '@mui/material/useMediaQuery';

import { MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getRolesFromAPI, getPenugasanFromAPI, postLogin } from 'src/utils/api';

// ----------------------------------------------------------------------

export default function LoginView() {
  const notify = (comment) => toast(comment);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [suratTugas, setSuratTugas] = useState('');

  const [jabatanList, setJabatanList] = useState([{}]);
  const [jabatan, setJabatan] = useState('');

  const [allPenugasan, setAllPenugasan] = useState([]);

  const handleClick = () => {};

  const handleChangeST = (event) => {
    setSuratTugas(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication

    setLoading(true);
    const form = new FormData(event.currentTarget);

    if (jabatan === '') {
      setLoading(false);
      notify('Pilih Role User Terlebih Dahulu');
      return;
    }
    if (jabatan !== 1 && suratTugas === '') {
      setLoading(false);
      notify('Pilih Surat Tugas Terlebih Dahulu');
      return;
    }

    const res = await postLogin({
      role_id: jabatan,
      id_penugasan: suratTugas,
      username: form.get('username'),
      password: form.get('password'),
    });

    // if (res.role_id === 200 && jabatan !== res.role_id) {
    //   setLoading(false);
    //   notify('Role User Tidak Sesuai');
    //   return;
    // }

    if (res.status === 200) {
      setLoading(false);
      notify('Berhasil Login');

      await login({
        username: res.data.data.username,
        role_id: res.data.data.role_id,
        user_id: res.data.data.id,
        surat_tugas: suratTugas,
      });
    } else {
      setLoading(false);
      notify('Username atau password atau role yang kamu masukkan salah');
    }
  };

  const handleChangeJabatan = (event) => {
    setJabatan(event.target.value);
    console.log(jabatan);
  };

  const handlePenugasanFromAPI = async () => {
    const penugasan = await getPenugasanFromAPI();
    setAllPenugasan(penugasan.data);
  };

  const renderForm = (
    <form onSubmit={handleLogin}>
      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel>Pilih Role User</InputLabel>
          <Select
            id="jabatan"
            value={jabatan}
            label="Pilih Role User"
            onChange={handleChangeJabatan}
          >
            {jabatanList.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {jabatan !== 1 && (
          <FormControl fullWidth>
            <InputLabel>Pilih Surat Tugas</InputLabel>
            <Select onChange={handleChangeST} label="Pilih Surat Tugas">
              {allPenugasan.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.no}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <TextField name="username" label="Username" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </form>
  );

  const handleRolesFromAPI = async () => {
    const roles = await getRolesFromAPI();
    setJabatanList(roles.data);
  };

  useEffect(() => {
    handleRolesFromAPI();
    handlePenugasanFromAPI();
  }, []);

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.2),
          imgUrl: '/assets/background/Backgroundapip.png',
        }),
        height: 1,
      }}
    >
      <Stack
        direction={isMobile ? 'column' : 'row'}
        alignItems="center"
        justifyContent="center"
        sx={{ height: 1, px: 3, py: 5 }}
      >
        {!isMobile && (
          <Box sx={{ mb: isMobile ? 2 : 0, mr: isMobile ? 0 : 8 }}>
            <img src="/assets/images/logo-makassar.png" alt="login" style={{ maxWidth: '100%' }} />
          </Box>
        )}
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          {isMobile && (
            <Box sx={{ mb: isMobile ? 2 : 0, mr: isMobile ? 0 : 8 }}>
              <img
                src="/assets/images/logo-makassar.png"
                alt="login"
                style={{ maxWidth: '100%' }}
              />
            </Box>
          )}
          {!isMobile && (
            <Typography sx={{ mb: 5 }} variant="h4">
              APLIKASI APIP TA
            </Typography>
          )}

          {renderForm}
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
      <ToastContainer position="top-center" />
    </Box>
  );
}
