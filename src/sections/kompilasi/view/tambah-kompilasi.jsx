import { useState, useEffect, useCallback } from 'react';
import { TextField, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast, ToastContainer } from 'react-toastify';
import { postSubmitKompilasi } from 'src/utils/api';
import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';

import Iconify from 'src/components/iconify';
import * as React from 'react';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function TambahKompilasi() {
  const notify = (comment) => toast(comment);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [user, setUser] = useLocalStorage('user');

  console.log('user', user);

  const handlePostKompilasi = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await postSubmitKompilasi({
      penugasan_id: form.get('penugasan_id'),
      no_lhp: form.get('no_lhp'),
      no_temuan: form.get('no_temuan'),
      temuan: form.get('temuan'),
      tgl_lhp: form.get('tgl_temuan'),
      kondisi: form.get('kondisi'),
      kriteria: form.get('kriteria'),
      sebab: form.get('sebab'),
      akibat: form.get('akibat'),
    });

    console.log(res);

    if (res.status === 201) {
      setLoading(false);

      notify('Berhasil Menambahkan Kompilasi');
      window.history.back();
    } else {
      setLoading(false);
      notify('Gagal Menambahkan Kompilasi');
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Tambah Temuan</Typography>

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
                  <form onSubmit={handlePostKompilasi}>
                    <Stack spacing={2}>
                      <TextField
                        name="penugasan_id"
                        value={user.surat_tugas}
                        sx={{ display: 'none' }}
                      />
                      <TextField multiline rows={4} name="no_lhp" label="No. LHP" />
                      <TextField multiline rows={4} name="no_temuan" label="No. Temuan" />
                      <TextField multiline rows={4} name="temuan" label="Temuan" />
                      <DatePicker
                        label="Tanggal Temuan"
                        name="tgl_temuan"
                        format="YYYY-MM-DD HH:mm:ss"
                      />
                      <TextField multiline rows={4} name="kondisi" label="Kondisi" />
                      <TextField multiline rows={4} name="sebab" label="Sebab" />
                      <TextField multiline rows={4} name="kriteria" label="Kriteria" />
                      <TextField multiline rows={4} name="akibat" label="Akibat" />
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
