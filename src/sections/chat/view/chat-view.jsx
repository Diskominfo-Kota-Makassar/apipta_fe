import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';
import { red } from '@mui/material/colors';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Iconify from 'src/components/iconify/iconify';
// import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { getUsersFromAPI } from 'src/utils/api';

import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function ChatPage() {
  const notify = (comment) => toast(comment);

  const [user, setUser] = useLocalStorage('user');

  const [penerima, setPenerima] = useState('');
  const [namaPenerima, setNamaPenerima] = useState('');
  const [usersList, setUsersList] = useState([]);

  const handleChangeUser = (event) => {
    setPenerima(event.target.value);
    const us = usersList.find((option) => option.id === event.target.value);
    setNamaPenerima(us.nama);
  };

  const handleUsersFromAPI = useCallback(async () => {
    const users = await getUsersFromAPI();
    setUsersList(users.data);
  }, []);

  useEffect(() => {
    handleUsersFromAPI();
  }, [handleUsersFromAPI]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Chat</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Card sx={{ p: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Pilih User</InputLabel>
              <Select value={penerima} label="Pilih User" onChange={handleChangeUser}>
                {usersList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {' '}
                    {option.nama}{' '}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Card>
        </Grid>
        <Grid item xs={6} md={8}>
          <Card sx={{ p: 3 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title={namaPenerima}
              subheader="September 14, 2016"
            />
            <CardContent>
              <Box
                height={400}
                // my={4}
                // display="flex"
                alignItems="center"
                gap={4}
                p={2}
                // sx={{ border: '2px solid grey' }}
              >
                isi chat
              </Box>
            </CardContent>
            <CardActions disableSpacing>
              <Box
                sx={{
                  width: '80%',
                  maxWidth: '100%',
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField fullWidth placeholder="Ketika pesan disini" />
                  <Button variant="contained" endIcon={<Iconify icon="eva:send-fill" />}>
                    Send
                  </Button>
                </Stack>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
