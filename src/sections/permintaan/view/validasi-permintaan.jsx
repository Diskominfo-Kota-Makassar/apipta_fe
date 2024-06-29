import { useState, useEffect, useCallback } from 'react';
import { TextField, CircularProgress, Select, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast, ToastContainer } from 'react-toastify';
import { baseURL, getPenugasanFromAPI, postSubmitPenugasan } from 'src/utils/api';
import { useRouter } from 'src/routes/hooks/use-router';
import { MuiFileInput } from 'mui-file-input';
import { useLocation } from 'react-router-dom';

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
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import { all } from 'axios';

// ----------------------------------------------------------------------

export default function ValidasiPermintaan() {
  const notify = (comment) => toast(comment);

  const location = useLocation();
  const allData = location.state || {};

  console.log(baseURL);
  const urlFile = allData.file.split('/')[1];

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [valueFile, setValueFile] = useState(null);

  const [allPenugasan, setAllPenugasan] = useState([]);
  const [tglST, setTglST] = useState('');
  const [uraianST, setUraianST] = useState('');

  const handleChangeFile = (newValue) => {
    setValueFile(newValue);
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

  const handlePenugasanFromAPI = async () => {
    const penugasan = await getPenugasanFromAPI();
    setAllPenugasan(penugasan.data);
  };

  useEffect(() => {
    handlePenugasanFromAPI();
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Validasi Dokumen</Typography>

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
                      <TextField name="no" value={allData.id} label="ID Permintaan" />
                      <TextField name="uraian" value={allData.no_ref_kka} label="No.Ref KKA" />
                      <TextField name="uraian" value={allData.no_ref_pka} label="No.Ref PKA" />
                      <TextField name="uraian" value={allData.judul_doc} label="Judul Dokumen" />
                      <TextField
                        name="uraian"
                        value={allData.uraian}
                        label="Catatan/keterangan dokumen"
                      />
                      <TextField name="uraian" value={allData.tgl_penugasan} label="Tgl" />

                      <Button
                        variant="contained"
                        onClick={() => window.open(`${baseURL}/file/${urlFile}`, '_blank')}
                      >
                        View
                      </Button>
                      <Grid container justifyContent="flex-end">
                        <Button variant="contained" type="submit">
                          Validasi
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
