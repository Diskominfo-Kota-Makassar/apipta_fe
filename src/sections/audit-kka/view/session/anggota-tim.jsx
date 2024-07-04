import { useState, useEffect, useCallback } from 'react';
import { TextField, CircularProgress, Select, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast, ToastContainer } from 'react-toastify';
import { getUsersFromAPI, postSubmitAuditKKA } from 'src/utils/api';
import { MuiFileInput } from 'mui-file-input';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';

import { useLocation } from 'react-router-dom';

import Iconify from 'src/components/iconify';
import * as React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ListItem from '@mui/material/ListItem';

// ----------------------------------------------------------------------

export default function AnggotaTim() {
  const notify = (comment) => toast(comment);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [valueHasilPengujian, setvalueHasilPengujian] = useState([]);
  const [valueBuktiDukung, setValueBuktiDukung] = useState(null);
  const [valueKesimpulanKKA, setValueKesimpulanKKA] = useState(null);

  const [allPenugasan, setAllPenugasan] = useState([]);
  const [tglST, setTglST] = useState('');
  const [uraianST, setUraianST] = useState('');

  const [at, setAt] = useState([]);
  const [atList, setAtList] = useState([]);

  const location = useLocation();
  const allData = location.state || {};

  const handleChangePengujian = (newValue) => {
    setvalueHasilPengujian([...valueHasilPengujian, ...newValue]);
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChangeAt = (event) => {
    const {
      target: { value },
    } = event;
    setAt(
      // On autofill we get a stringified value.
      typeof value === 'number' ? value.split(',') : value
    );
  };

  const handleChangeST = (event) => {
    const penugasan = allPenugasan.find((option) => option.id === event.target.value);
    setTglST(penugasan.tgl);
    setUraianST(penugasan.uraian);
  };

  const handlePostAuditKKA = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    console.log(form.get('id_audit'));
    console.log(valueKesimpulanKKA);
    console.log(valueBuktiDukung);
    console.log(valueHasilPengujian);
    console.log(form.get('catatan_review'));

    const res = await postSubmitAuditKKA({
      id_audit: form.get('id_audit'),
      file_kesimpulan: valueKesimpulanKKA,
      file_bukti_dukung: valueBuktiDukung,
      hasil_pengujian: valueHasilPengujian,
      catatan_review: form.get('catatan_review'),
    });

    console.log(res);

    if (res.status === 201) {
      setLoading(false);
      // window.location.reload();
      notify('Berhasil Melakukan Update KKA');
      window.history.back();
    } else {
      setLoading(false);
      notify('Gagal Melakukan Update KKA');
    }
  };

  const handleChangeBuktiDukung = (newValue) => {
    setValueBuktiDukung(newValue);
  };

  const handleChangeKesimpulanKKA = (newValue) => {
    setValueKesimpulanKKA(newValue);
  };

  const handleUsersFromAPI = useCallback(async () => {
    const users = await getUsersFromAPI();
    const usersObject = await users.data;
    usersObject.forEach((user) => {
      if (user.role_id === 3) {
        setAtList((prevAtList) => [...prevAtList, user]);
      }
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">FORM AUDIT KKA</Typography>

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
                  <form onSubmit={handlePostAuditKKA}>
                    <Stack spacing={2}>
                      <TextField name="id_audit" label="ID KKA" value={allData.id} />
                      <TextField name="kka" label="No.Ref KKA" value={allData.no_ref_kka} />
                      <TextField name="pka" label="No.Ref PKA" value={allData.no_ref_pka} />
                      <TextField name="judul" label="Judul Pengujian" value={allData.judul} />
                      <TextField name="catatan_review" label="Catatan Anggota Tim" />
                      <MuiFileInput
                        multiple
                        name="hasil_pengujian"
                        placeholder="Pilih File Hasil Pengujian"
                        value={valueHasilPengujian}
                        onChange={handleChangePengujian}
                      />
                      <Typography variant="body2">
                        *Only .jpg .png .Files,500kb max file size
                      </Typography>
                      {valueHasilPengujian.map((file) => (
                        <ListItem key={file.name}>{file.name}</ListItem>
                      ))}
                      <MuiFileInput
                        name="dokumen_bukti_dukung"
                        placeholder="Pilih Dokumen Bukti Dukung"
                        value={valueBuktiDukung}
                        onChange={handleChangeBuktiDukung}
                      />
                      <MuiFileInput
                        name="kesimpulan_kka"
                        placeholder="Pilih Kesimpulan KKA"
                        value={valueKesimpulanKKA}
                        onChange={handleChangeKesimpulanKKA}
                      />
                      <Grid container justifyContent="flex-end">
                        <Button variant="contained" type="submit">
                          Update
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
