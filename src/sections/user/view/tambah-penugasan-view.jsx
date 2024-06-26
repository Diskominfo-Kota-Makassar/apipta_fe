import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { TextField, CircularProgress } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Iconify from 'src/components/iconify';
import * as React from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { postForm } from 'src/utils/api';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
// ----------------------------------------------------------------------

export default function TambahPenugasan() {
  const notify = (comment) => toast(comment);

  const [listLayanan, setListLayanan] = useState([{ id: 1, nama: 'Buku Tamu' }]);
  const [namaLayanan, setNamaLayanan] = useState('Buku Tamu');

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    const namaLayananApi = listLayanan[index].nama;
    setNamaLayanan(namaLayananApi);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const jenis_layanan = namaLayanan;

    const res = await postForm({
      tanggal: form.get('tanggal'),
      jenis_layanan,
      nama: form.get('nama'),
      alamat: form.get('alamat'),
      nomorHp: form.get('nomorHp'),
      tujuan: form.get('tujuan'),
      keterangan: form.get('keterangan'),
      agama: form.get('agama'),
      tmp_lahir: form.get('tmp_lahir'),
      tgl_lahir: form.get('tgl_lahir'),
      pekerjaan: form.get('pekerjaan'),
      nm_ayah: form.get('nm_ayah'),
      nm_ibu: form.get('nm_ibu'),
      jkel: form.get('jkel'),
      pewaris: form.get('pewaris'),
      ahliWaris: form.get('ahliWaris'),
      umur: form.get('umur'),
      namaInstansiPengirim: form.get('namaInstansiPengirim'),
      namaInstansiTujuan: form.get('namaInstansiTujuan'),
      nomorSurat: form.get('nomorSurat'),
      penanggungjawab: form.get('penanggungjawab'),
      perihal: form.get('perihal'),
      namaCalonIstri: form.get('namaCalonIstri'),
      alamatCalonIstri: form.get('alamatCalonIstri'),
      tempatLahirCalonIstri: form.get('tempatLahirCalonIstri'),
      tanggalLahirCalonIstri: form.get('tanggalLahirCalonIstri'),
      pekerjaanCalonIstri: form.get('pekerjaanCalonIstri'),
      namaCalonSuami: form.get('namaCalonSuami'),
      alamatCalonSuami: form.get('alamatCalonSuami'),
      tempatLahirCalonSuami: form.get('tempatLahirCalonSuami'),
      tanggalLahirCalonSuami: form.get('tanggalLahirCalonSuami'),
      pekerjaanCalonSuami: form.get('pekerjaanCalonSuami'),
      umurMeninggal: form.get('umurMeninggal'),
      tempatMeninggal: form.get('tempatMeninggal'),
      tanggalMeninggal: form.get('tanggalMeninggal'),
      NIB: form.get('NIB'),
      jenisUsaha: form.get('jenisUsaha'),
      alamatUsaha: form.get('alamatUsaha'),
    });

    if (res.status === 200) {
      setLoading(false);
      notify('Berhasil Menambahkan');
    } else {
      setLoading(false);
      notify('Gagal Menambahkan');
    }
  };

  useEffect(() => {}, []);

  const renderBukuTamu = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <DatePicker label="Pilih Tanggal" name="tanggal" />
          <TextField name="nama" label="Nama" />
          <TextField name="alamat" label="Alamat" />
          <TextField name="nomorHp" label="Nomor Hp" />
          <TextField name="tujuan" label="Tujuan" />
          <TextField name="keterangan" label="Keterangan" />
          <Grid container justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Stack>
      </form>
    </CardContent>
  );

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
