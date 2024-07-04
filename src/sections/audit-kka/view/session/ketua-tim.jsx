import { useState, useEffect, useCallback } from 'react';
import { TextField, CircularProgress, Select, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast, ToastContainer } from 'react-toastify';
import { baseURL, putUpdateAuditKKA } from 'src/utils/api';
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
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function KetuaTim() {
  const notify = (comment) => toast(comment);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [valueHasilPengujian, setvalueHasilPengujian] = useState([]);

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

  const handlePutAuditKKA = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    console.log(form.get('catatan_review'));

    const res = await putUpdateAuditKKA({
      id_audit: form.get('id_audit'),
      tim_ketua: form.get('catatan_review_ketua'),
    });

    console.log(res);

    if (res.status === 200) {
      setLoading(false);
      // window.location.reload();
      notify('Berhasil Melakukan Update KKA');
      window.history.back();
    } else {
      setLoading(false);
      notify('Gagal Melakukan Update KKA');
    }
  };

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
                  <form onSubmit={handlePutAuditKKA}>
                    <Stack spacing={2}>
                      <TextField name="id_audit" value={allData.id} label="ID KKA" />
                      <TextField value={allData.no_ref_kka} label="No.Ref KKA" />
                      <TextField value={allData.no_ref_pka} label="No.Ref PKA" />
                      <TextField value={allData.judul} label="Judul Pengujian" />
                      <Grid container> Next Show All Image From DB </Grid>
                      <Button
                        variant="contained"
                        onClick={() =>
                          window.open(`${baseURL}/file/${allData.file_bukti_dukung}`, '_blank')
                        }
                      >
                        {' '}
                        View Dokumen Bukti Dukung Audit{' '}
                      </Button>
                      <TextField
                        multiline
                        name="catatan_anggota_tim"
                        value={allData.catatan_review}
                        label="Catatan Anggota Tim"
                      />
                      <Button
                        variant="contained"
                        onClick={() =>
                          window.open(`${baseURL}/file/${allData.file_kesimpulan}`, '_blank')
                        }
                      >
                        {' '}
                        View Dokumen Kesimpulan KKA{' '}
                      </Button>
                      <TextField
                        multiline
                        name="catatan_review_ketua"
                        label="Catatan Review Ketua Tim"
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
