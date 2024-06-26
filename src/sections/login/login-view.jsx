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

import { MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getRolesFromAPI, postLogin } from 'src/utils/api';

// ----------------------------------------------------------------------

export default function LoginView() {
  const notify = (comment) => toast(comment);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const [jabatanList, setJabatanList] = useState([{}]);
  const [jabatan, setJabatan] = useState('');

  const handleClick = () => {};

  const handleLogin = async (event) => {
    event.preventDefault();
    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication

    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await postLogin({
      role_id: jabatan,
      surat_tugas: form.get('surat_tugas'),
      username: form.get('username'),
      password: form.get('password'),
    });

    if (res.status === 200) {
      setLoading(false);
      notify('Berhasil Login');
      await login({
        username: form.get('username'),
        role_id: jabatan,
      });
    } else {
      setLoading(false);
      notify('Username atau password yang kamu masukkan salah');
    }
  };

  const handleChangeJabatan = (event) => {
    setJabatan(event.target.value);
  };

  const renderForm = (
    <form onSubmit={handleLogin}>
      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel>Pilih Role User</InputLabel>
          <Select labelId="jabatan" value={jabatan} label="Jabatan" onChange={handleChangeJabatan}>
            {jabatanList.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {' '}
                {option.name}{' '}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Pilih Surat Tugas</InputLabel>
          <Select name="surat_tugas" label="Surat Tugas">
            <MenuItem key="Surat Tugas 1" value="Surat Tugas 1">
              Surat Tugas 1
            </MenuItem>
            <MenuItem key="Surat Tugas 2" value="Surat Tugas 2">
              Surat Tugas 2
            </MenuItem>
          </Select>
        </FormControl>
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
  }, []);

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/bg-red-tech.svg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          {/* <Typography>Login</Typography> */}
          <Typography sx={{ mb: 5 }} variant="h4">
            APLIKASI APIP TA
          </Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography> */}

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack> */}

          {/* <Divider sx={{ my: 3 }}> */}
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography> */}
          {/* </Divider> */}

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
