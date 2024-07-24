import { useState, useEffect, useCallback } from 'react';
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
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Iconify from 'src/components/iconify/iconify';
// import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { getChat, getUsersFromAPI, postChat } from 'src/utils/api';

// ----------------------------------------------------------------------

export default function ChatPage() {
  const notify = (comment) => toast(comment);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useLocalStorage('user');

  const [penerima, setPenerima] = useState('');
  const [penerimaEmail, setPenerimaEmail] = useState('');
  const [pengirim, setPengirim] = useState('');
  const [namaPenerima, setNamaPenerima] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messagesMe, setMessagesMe] = useState([]);

  const handleChangeUser = (event) => {
    setPenerima(event.target.value);
    const us = usersList.find((option) => option.id === event.target.value);
    setNamaPenerima(us.nama);
    setPenerimaEmail(us.email);
    const sender = usersList.find((option) => option.id === user.user_id);
    setPengirim(sender.email);

    handleGetChatFromAPI();
  };

  const handleUsersFromAPI = useCallback(async () => {
    const users = await getUsersFromAPI();
    setUsersList(users.data);
  }, []);

  const handlePostChat = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await postChat({
      no: '1',
      penugasan_id: user.surat_tugas,
      tim_id: '1',
      penerima: penerimaEmail,
      pengirim,
      judul: 'judul',
      isi: form.get('isi'),
    });

    handleGetChatFromAPI();
    handleGetChatFromMe();
  };

  const handleGetChatFromAPI = useCallback(async () => {
    const chat = await getChat({ pengirimEmail: penerimaEmail });

    const chatData = chat.data;

    if (chatData !== undefined) {
      setMessages(chatData);
    }

    if (chatData === undefined) {
      setMessages([]);
    }
  }, [penerimaEmail]);

  const handleGetChatFromMe = useCallback(async () => {
    const chat = await getChat({ pengirimEmail: pengirim });

    const chatData = chat.data;

    if (chatData !== undefined) {
      setMessagesMe(chatData);
    }

    if (chatData === undefined) {
      setMessagesMe([]);
    }
  }, [pengirim]);

  const combinedData = [...messages, ...messagesMe];

  const sortedCombinedData = combinedData.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  useEffect(() => {
    handleUsersFromAPI();
    handleGetChatFromMe();
    handleGetChatFromAPI();
  }, [handleUsersFromAPI, handleGetChatFromAPI, handleGetChatFromMe]);

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
              subheader=" ---, --- , 2024"
            />
            <CardContent>
              {/* <Box
                height={400}
                // my={4}
                // display="flex"
                alignItems="center"
                gap={4}
                p={2}
                // sx={{ border: '2px solid grey' }}
              > */}
              <List sx={{ position: 'relative', overflow: 'auto' }}>
                {sortedCombinedData.map((message, index) => (
                  <ListItem key={index}>
                    <Paper
                      elevation={3}
                      sx={{
                        flex: 1,
                        overflow: 'auto',
                        padding: 2,
                        backgroundColor: '#fff',
                      }}
                    >
                      <ListItemText
                        primary={message.isi}
                        secondary={message.pengirim}
                        sx={{
                          textAlign: message.pengirim === pengirim ? 'right' : 'left',
                        }}
                      />
                    </Paper>
                  </ListItem>
                ))}
              </List>
              {/* </Box> */}
            </CardContent>
            <CardActions disableSpacing>
              <Box
                sx={{
                  width: '80%',
                  maxWidth: '100%',
                }}
              >
                <form onSubmit={handlePostChat}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TextField fullWidth name="isi" placeholder="Ketik pesan disini" />
                    <Button
                      variant="contained"
                      type="submit"
                      endIcon={<Iconify icon="eva:send-fill" />}
                    >
                      Send
                    </Button>
                  </Stack>
                </form>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
