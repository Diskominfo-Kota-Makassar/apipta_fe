import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { TextField, CircularProgress, Select, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast, ToastContainer } from 'react-toastify';
import { getPenugasanFromAPI, postSubmitPermintaan } from 'src/utils/api';
import { MuiFileInput } from 'mui-file-input';

import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';

import Iconify from 'src/components/iconify';

import MenuItem from '@mui/material/MenuItem';

import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function TambahPermintaan() {
  const notify = (comment) => toast(comment);

  const user = useLocalStorage('user');

  const [loading, setLoading] = useState(false);

  const [valueFile, setValueFile] = useState(null);

  const [allPenugasan, setAllPenugasan] = useState([]);
  const [noST, setNoST] = useState('');
  const [tglST, setTglST] = useState('');
  const [uraianST, setUraianST] = useState('');

  const handleChangeFile = (newValue) => {
    setValueFile(newValue);
  };

  const handleChangeST = (event) => {
    const penugasan = allPenugasan.find((option) => option.id === event.target.value);
    setNoST(penugasan.no);
    setTglST(penugasan.tgl);
    setUraianST(penugasan.uraian);
  };

  const handlePostPermintaan = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await postSubmitPermintaan({
      no: noST,
      tgl_penugasan: tglST,
      uraian: uraianST,
      no_ref_kka: form.get('no_ref_kka'),
      no_ref_pka: form.get('no_ref_pka'),
      judul_doc: form.get('judul_doc'),
      ket: form.get('ket'),
      file: valueFile,
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

  const handlePenugasanFromAPI = useCallback(async () => {
    try {
      const penugasan = await getPenugasanFromAPI();

      if (user[0].role_id === 1) {
        setAllPenugasan(penugasan.data);
        return;
      }

      if (user[0].surat_tugas !== '') {
        const id_surat_dipilih = user[0].surat_tugas;
        const penugasanTerpilih = penugasan.data.find((option) => option.id === id_surat_dipilih);
        setAllPenugasan([penugasanTerpilih]);
      } else {
        setAllPenugasan([]);
      }
    } catch (error) {
      console.error('Error fetching penugasan data:', error);
      // Handle error appropriately
    }
  }, [user]);

  useEffect(() => {
    handlePenugasanFromAPI();
  }, [handlePenugasanFromAPI]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Tambah Permintaan</Typography>

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
                  <form onSubmit={handlePostPermintaan}>
                    <Stack spacing={2}>
                      {/* <TextField name="no" label="ID Permintaan" /> */}
                      <FormControl fullWidth>
                        <InputLabel>NO.ST</InputLabel>
                        <Select label="No.ST" onChange={handleChangeST}>
                          {allPenugasan.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {' '}
                              {option.no}{' '}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField disabled name="tgl_penugasan" value={tglST} />
                      <TextField disabled name="uraian_penugasan" value={uraianST} />
                      <TextField name="no_ref_kka" label="No.Ref KKA" />
                      <TextField name="no_ref_pka" label="No.Ref PKA" />
                      <TextField name="judul_doc" label="Judul Dokumen" />
                      <TextField rows={4} multiline name="ket" label="Catatan/keterangan dokumen" />
                      <MuiFileInput
                        name="file"
                        placeholder="Pilih File"
                        value={valueFile}
                        onChange={handleChangeFile}
                      />
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
