import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { getUsersFromAPI } from 'src/utils/api';

import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function ChatPage() {
  const notify = (comment) => toast(comment);

  const [user, setUser] = useLocalStorage('user');

  const [userList, setUserList] = useState([]);

  const handleUsersFromAPI = useCallback(async () => {
    const users = await getUsersFromAPI();
    const usersObject = await users.data;
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
            <Button variant="contained" color="success">
              Pilih User
            </Button>
          </Card>
        </Grid>
        <Grid item xs={6} md={8}>
          <Card sx={{ p: 3 }}> Untuk chat </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
