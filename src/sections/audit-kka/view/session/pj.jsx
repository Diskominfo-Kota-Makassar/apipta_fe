import { useState, useEffect, useCallback } from 'react';
import { TextField, CircularProgress, Select, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast, ToastContainer } from 'react-toastify';
import { getPenugasanFromAPI, postSubmitPenugasan, getUsersFromAPI } from 'src/utils/api';
import { MuiFileInput } from 'mui-file-input';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';

import Iconify from 'src/components/iconify';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import 'react-toastify/dist/ReactToastify.css';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

export default function PJ() {
  const notify = (comment) => toast(comment);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [valueHasilPengujian, setvalueHasilPengujian] = useState([]);
  const [valueBuktiDukungAudit, setValueBuktiDukungAudit] = useState(null);
  const [valueKesimpulanKKA, setValueKesimpulanKKA] = useState(null);

  const [allPenugasan, setAllPenugasan] = useState([]);
  const [tglST, setTglST] = useState('');
  const [uraianST, setUraianST] = useState('');

  const [at, setAt] = useState([]);
  const [atList, setAtList] = useState([]);

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

  const handlePostPenugasan = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await postSubmitPenugasan({
      no: form.get('no'),
      tgl: form.get('tgl'),
      uraian: form.get('uraian'),
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

  const handleChangeBuktiDukungAudit = (newValue) => {
    setValueBuktiDukungAudit(newValue);
  };

  const handleChangeKesimpulanKKA = (newValue) => {
    setValueKesimpulanKKA(newValue);
  };

  const handlePenugasanFromAPI = async () => {
    const penugasan = await getPenugasanFromAPI();
    setAllPenugasan(penugasan.data);
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

  useEffect(() => {
    handlePenugasanFromAPI();
    handleUsersFromAPI();
  }, [handleUsersFromAPI]);

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
                  <form onSubmit={handlePostPenugasan}>
                    <Stack spacing={2}>
                      <TextField name="uraian" label="ID KKA" />
                      <TextField name="uraian" label="No.Ref KKA" />
                      <TextField name="uraian" label="No.Ref PKA" />
                      <TextField name="uraian" label="Judul Pengujian" />
                      <Grid container> Next Show All Image From DB </Grid>
                      <Button variant="contained"> View Dokumen Bukti Dukung Audit </Button>
                      <TextField multiline name="catatan_anggota_tim" label="Catatan Anggota Tim" />
                      <Button variant="contained"> View Dokumen Kesimpulan KKA </Button>
                      <TextField
                        multiline
                        name="catatan_review_ketua_tim"
                        label="Catatan Review Ketua Tim"
                      />
                      <TextField multiline name="catatan_review_ketua_tim" label="Catatan Dalnis" />
                      <TextField
                        multiline
                        name="catatan_review_ketua_tim"
                        label="Catatan Review WPJ"
                      />
                      <TextField multiline name="catatan_review_ketua_tim" label="Catatan BPKP" />
                      <TextField multiline name="catatan_review_ketua_tim" label="Catatan PJ" />
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
