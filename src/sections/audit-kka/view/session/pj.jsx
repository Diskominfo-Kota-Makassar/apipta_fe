import { useState, useEffect } from 'react';
import { TextField, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast, ToastContainer } from 'react-toastify';
import { fileBaseURL, putUpdateAuditKKA } from 'src/utils/api';
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

export default function PJ() {
  const notify = (comment) => toast(comment);

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const allData = location.state || {};

  const [at, setAt] = useState([]);

  const handlePutAuditKKA = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    console.log(form.get('catatan_review'));

    const res = await putUpdateAuditKKA({
      id_audit: form.get('id_audit'),
      pj: form.get('pj'),
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
                      <Typography variant="button" sx={{ marginBottom: 2 }}>
                        List File hasil pengujian
                      </Typography>
                      {allData.hasil_pengujian !== null &&
                        allData.hasil_pengujian.map((fileName, i) => (
                          <Button
                            key={i}
                            variant="outlined"
                            onClick={() =>
                              window.open(`${fileBaseURL}/file/inspektorat/${fileName}`, '_blank')
                            }
                            sx={{ marginBottom: 1 }}
                          >
                            View {fileName}
                          </Button>
                        ))}
                      <Button
                        variant="contained"
                        onClick={() =>
                          window.open(
                            `${fileBaseURL}/file/inspektorat/${allData.file_bukti_dukung}`,
                            '_blank'
                          )
                        }
                      >
                        {' '}
                        View Dokumen Bukti Dukung Audit{' '}
                      </Button>
                      <TextField
                        multiline
                        rows={4}
                        name="catatan_anggota_tim"
                        value={allData.catatan_review}
                        label="Catatan Anggota Tim"
                      />
                      <Button
                        variant="contained"
                        onClick={() =>
                          window.open(
                            `${fileBaseURL}/file/inspektorat/${allData.file_kesimpulan}`,
                            '_blank'
                          )
                        }
                      >
                        {' '}
                        View Dokumen Kesimpulan KKA{' '}
                      </Button>
                      <TextField
                        multiline
                        rows={4}
                        name="catatan_review_ketua"
                        label="Catatan Reviu Ketua Tim"
                        value={allData.tim_ketua}
                      />
                      <TextField
                        multiline
                        rows={4}
                        value={allData.dalnis}
                        label="Catatan Reviu Dalnis"
                      />
                      <TextField
                        multiline
                        rows={4}
                        value={allData.catatan_wpj}
                        label="Catatan Reviu WPJ"
                      />
                      <TextField
                        multiline
                        rows={4}
                        value={allData.bpkp}
                        label="Catatan BPKP (Eksternal)"
                      />
                      <TextField multiline rows={4} name="pj" label="Catatan Reviu PJ" />
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
