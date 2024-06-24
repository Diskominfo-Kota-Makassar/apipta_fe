import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { TextField, CircularProgress, useMediaQuery, useTheme } from '@mui/material';

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

import { postForm, getLayanan } from 'src/utils/api';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
// ----------------------------------------------------------------------

export default function TambahPenugasan() {
  const notify = (comment) => toast(comment);

  const [listLayanan, setListLayanan] = useState([{ id: 1, nama: 'Buku Tamu' }]);
  const [namaLayanan, setNamaLayanan] = useState('Buku Tamu');

  const [loading, setLoading] = useState(false);

  const options = [
    'Buku Tamu',
    'Surat Keterangan Tidak Mampu',
    'Surat Keterangan Belum Menikah',
    'Surat Keterangan Kelahiran',
    'Surat Keterangan Domisili',
    'Surat Keterangan Kewarisan',
    'Surat Masuk',
    'Surat Keluar',
    'Serba-serbi',
    'Register Menikah',
    'Keterangan Kematian',
    'Keterangan Pengesahan',
    'Keterangan Usaha',
  ];

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

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

  const getJenisLayanan = async () => {
    const jenisLayanan = await getLayanan();
    setListLayanan(jenisLayanan);
  };

  useEffect(() => {
    // getJenisLayanan();
  }, []);

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

  const renderKeteranganTidakMampu = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <TextField name="nama" label="Nama" />
          <TextField name="alamat" label="Alamat" />
          <DatePicker name="tgl_lahir" label="Tanggal Lahir" />
          <TextField name="pekerjaan" label="Pekerjaan" />
          <TextField name="tujuan" label="Tujuan" />
          <DatePicker name="tanggal" label="Tanggal" />
          <TextField name="keterangan" label="Keterangan / NIK" />
          <Grid container justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Stack>
      </form>
    </CardContent>
  );

  const renderKeteranganBelumMenikah = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <TextField name="nama" label="Nama" />
          <TextField name="alamat" label="Alamat" />
          <TextField name="tmp_lahir" label="Tempat Lahir" />
          <DatePicker name="tgl_lahir" label="Tanggal Lahir" />
          <TextField name="pekerjaan" label="Pekerjaan" />
          <DatePicker name="tanggal" label="Tanggal" />
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

  const renderKeteranganKelahiran = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <TextField name="nama" label="Nama" />
          <TextField name="agama" label="Agama" />
          <TextField name="nm_ayah" label="Nama Ayah" />
          <TextField name="nm_ibu" label="Nama Ibu" />
          <TextField name="jkel" label="Jenis Kelamin" />
          <TextField name="tmp_lahir" label="Tempat Lahir" />
          <DatePicker name="tgl_lahir" label="Tanggal Lahir" />
          <TextField name="alamat" label="Alamat" />
          <DatePicker name="tanggal" label="Tanggal" />
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

  const renderKeteranganDomisili = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <TextField name="nama" label="Nama" />
          <TextField name="jkel" label="Jenis Kelamin" />
          <TextField name="tmp_lahir" label="Tempat Lahir" />
          <DatePicker name="tgl_lahir" label="Tanggal Lahir" />
          <TextField name="pekerjaan" label="Pekerjaan" />
          <TextField name="alamat" label="Alamat" />
          <DatePicker name="tanggal" label="Tanggal" />
          <Grid container justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Stack>
      </form>
    </CardContent>
  );

  const renderKeteranganKewarisan = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <DatePicker name="tanggal" label="Tanggal" />
          <TextField name="pewaris" label="Pewaris" />
          <DatePicker name="tanggalMeninggal" label="Tanggal Meninggal" />
          <TextField name="tempatMeninggal" label="Tempat Meninggal" />
          <TextField name="ahliWaris" label="Ahli Waris" />
          <TextField name="umur" label="Umur" />
          <TextField name="alamat" label="Alamat" />
          <Grid container justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Stack>
      </form>
    </CardContent>
  );

  const renderSuratMasuk = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <TextField name="namaInstansiPengirim" label="Nama Instansi Pengirim" />
          <TextField name="nomorSurat" label="Nomor Surat" />
          <TextField name="penanggungjawab" label="Penanggungjawab" />
          <TextField name="perihal" label="Perihal" />
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

  const renderSuratKeluar = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <TextField name="namaInstansiTujuan" label="Nama Instansi Tujuan" />
          <TextField name="nomorSurat" label="Nomor Surat" />
          <TextField name="penanggungjawab" label="Penanggungjawab" />
          <TextField name="perihal" label="Perihal" />
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

  const renderSerbaSerbi = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <DatePicker name="tanggal" label="Tanggal" />
          <TextField name="nama" label="Nama" />
          <TextField name="tmp_lahir" label="Tempat Lahir" />
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
  const renderRegisterMenikah = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <TextField name="namaCalonIstri" label="Nama Calon Istri" />
          <TextField name="alamatCalonIstri" label="Alamat Calon Istri" />
          <TextField name="tempatLahirCalonIstri" label="Tempat Lahir Calon Istri" />
          <DatePicker name="tanggalLahirCalonIstri" label="Tangal Lahir Calon Istri" />
          <TextField name="pekerjaanCalonIstri" label="Pekerjaan Calon Istri" />
          <TextField name="namaCalonSuami" label="Nama Calon Suami" />
          <TextField name="alamatCalonSuami" label="Alamat Calon Suami" />
          <TextField name="tempatLahirCalonSuami" label="Tempat Lahir Calon Suami" />
          <DatePicker name="tanggalLahirCalonSuami" label="Tangal Lahir Calon Suami" />
          <TextField name="pekerjaanCalonSuami" label="Pekerjaan Calon Suami" />
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

  const renderKeteranganKematian = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <TextField name="nama" label="Nama" />
          <TextField name="umur" label="Umur" />
          <TextField name="jkel" label="Jenis Kelamin" />
          <TextField name="agama" label="Agama" />
          <TextField name="alamat" label="Alamat" />
          <TextField name="tempatMeninggal" label="Tempat Meninggal" />
          <DatePicker name="tanggalMeninggal" label="Tanggal Meninggal" />
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

  const renderKeteranganPengesahan = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <DatePicker name="tanggal" label="Tanggal" />
          <TextField name="nama" label="Nama" />
          <TextField name="tmp_lahir" label="Tempat Lahir" />
          <DatePicker name="tgl_lahir" label="Tanggal Lahir" />
          <TextField name="pekerjaan" label="Pekerjaan" />
          <TextField name="alamat" label="Alamat" />
          <TextField name="tujuan" label="Tujuan" />
          <Grid container justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Stack>
      </form>
    </CardContent>
  );
  const renderKeteranganUsaha = (
    <CardContent>
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <DatePicker name="tanggal" label="Tanggal" />
          <TextField name="nama" label="Nama Pemohon" />
          <TextField name="alamat" label="Alamat Pemohon" />
          <TextField name="NIB" label="NIB" />
          <TextField name="jenisUsaha" label="Jenis Usaha" />
          <TextField name="alamatUsaha" label="Alamat Usaha" />
          <TextField name="nomorHp" label="Nomor WA" />
          <Grid container justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Stack>
      </form>
    </CardContent>
  );

  const getForm = () => {
    if (selectedIndex === 0) {
      return <>{renderBukuTamu}</>;
    }
    if (selectedIndex === 1) {
      return <>{renderKeteranganTidakMampu}</>;
    }
    if (selectedIndex === 2) {
      return <>{renderKeteranganBelumMenikah}</>;
    }
    if (selectedIndex === 3) {
      return <>{renderKeteranganKelahiran}</>;
    }
    if (selectedIndex === 4) {
      return <>{renderKeteranganDomisili}</>;
    }
    if (selectedIndex === 5) {
      return <>{renderKeteranganKewarisan}</>;
    }
    if (selectedIndex === 6) {
      return <>{renderSuratMasuk}</>;
    }
    if (selectedIndex === 7) {
      return <>{renderSuratKeluar}</>;
    }
    if (selectedIndex === 8) {
      return <>{renderSerbaSerbi}</>;
    }
    if (selectedIndex === 9) {
      return <>{renderRegisterMenikah}</>;
    }
    if (selectedIndex === 10) {
      return <>{renderKeteranganKematian}</>;
    }
    if (selectedIndex === 11) {
      return <>{renderKeteranganPengesahan}</>;
    }
    if (selectedIndex === 12) {
      return <>{renderKeteranganUsaha}</>;
    }
    return <>{renderBukuTamu}</>;
  };

  const renderDropDownButton = (
    <>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="Button group with a nested menu">
        {/* <Button onClick={handleClick}>{options[selectedIndex]}</Button> */}
        <Button onClick={handleClick}>{listLayanan[selectedIndex].nama}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <Icon icon="mdi-light:chevron-down" width={30} />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {listLayanan.map((option, index) => (
                    <MenuItem
                      key={option.id}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.nama}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Form Permohonan</Typography>

        <Button
          variant="contained"
          onClick={() => window.history.back()}
          color="inherit"
          startIcon={<Iconify icon="icon-park-outline:back" />}
        >
          Kembali
        </Button>
      </Stack>

      <CardContent>{renderDropDownButton}</CardContent>

      <ToastContainer position="top-center" />

      <Stack>
        <Card>
          <Grid container>
            <Grid item sm={12} md={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>{getForm()}</LocalizationProvider>
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
