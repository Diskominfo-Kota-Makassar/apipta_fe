import { useState } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { useTheme } from '@mui/material/styles';
import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';

import {
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Grid,
  CircularProgress,
  TableBody,
  TableContainer,
  CardContent,
} from '@mui/material';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import {
  deleteKompilasi,
  deleteRekomendasi,
  deleteAksi,
  postSubmitRekomendasi,
  postSubmitRencanaAksi,
  putSubmitKompilasi,
  putSubmitRekomendasi,
} from 'src/utils/api';

// ----------------------------------------------------------------------

export default function UserTableRow({
  index,
  id,
  no_lhp,
  kondisi,
  kriteria,
  sebab,
  akibat,
  notify,
  allData,
}) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const [user, setUser] = useLocalStorage('user');

  const router = useRouter();

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [idRekomendasi, setIdRekomendasi] = useState();
  const [idRekomendasiForDelete, setIdRekomendasiForDelete] = useState();
  const [idAksiForDelete, setIdAksiForDelete] = useState();
  const [dataAksi, setDataAksi] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  console.log(allData);

  const handleDeletePenugasan = async (event) => {
    setOpenDialog(false);

    const res = await deleteKompilasi(id);

    if (res.status === 200) {
      setLoading(false);
      window.location.reload();
      notify('Berhasil Menghapus Kompilasi');
    } else {
      setLoading(false);
      notify('Gagal Menghapus Kompilasi');
    }
  };
  const handleDeleteRekomendasi = async (event) => {
    setOpenDialog(false);

    const res = await deleteRekomendasi(idRekomendasiForDelete);

    console.log(res);

    if (res.status === 200) {
      setLoading(false);
      window.location.reload();
      notify('Berhasil Menghapus Rekomendasi');
    } else {
      setLoading(false);
      notify('Gagal Menghapus Rekomendasi');
    }
  };
  const handleDeleteAksi = async (event) => {
    setOpenDialog(false);

    const res = await deleteAksi(idAksiForDelete);

    if (res.status === 200) {
      setLoading(false);
      window.location.reload();
      notify('Berhasil Menghapus Aksi');
    } else {
      setLoading(false);
      notify('Gagal Menghapus Aksi');
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogRekomendasi, setOpenDialogRekomendasi] = useState(false);
  const [openDialogRencanaAksi, setOpenDialogRencanaAksi] = useState(false);

  const [openDialogDeleteRekomendasi, setOpenDialogDeleteRekomendasi] = useState(false);
  const [openDialogDeleteAksi, setOpenDialogDeleteAksi] = useState(false);

  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogEditRekomendasi, setOpenDialogEditRekomendasi] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClickOpenDialogRekomendasi = () => {
    setOpenDialogRekomendasi(true);
  };

  const handleClickOpenDialogRencanaAksi = (data) => {
    setDataAksi(data.aksis);
    setIdRekomendasi(data.id);

    setOpenDialogRencanaAksi(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDialogRekomendasi = () => {
    setOpenDialogRekomendasi(false);
  };

  const handleCloseDialogRencanaAksi = () => {
    setOpenDialogRencanaAksi(false);
  };

  const handleOpenDialogEdit = () => {
    setOpenDialogEdit(true);
  };
  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };
  const handleOpenDialogEditRekomendasi = () => {
    setOpenDialogEditRekomendasi(true);
  };
  const handleCloseDialogEditRekomendasi = () => {
    setOpenDialogEditRekomendasi(false);
  };

  const handleOpenDialogDeleteRekomendasi = (idRekomen) => {
    setIdRekomendasiForDelete(idRekomen);
    setOpenDialogDeleteRekomendasi(true);
  };

  const handleOpenDialogDeleteAksi = (idAksi) => {
    setIdAksiForDelete(idAksi);
    setOpenDialogDeleteAksi(true);
  };
  const handleCloseDialogDeleteRekomendasi = () => {
    setOpenDialogDeleteRekomendasi(false);
  };

  const handleCloseDialogDeleteAksi = () => {
    setOpenDialogDeleteAksi(false);
  };

  const handleSubmitRekomendasi = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await postSubmitRekomendasi({
      id_kompilasi: id,
      masukan: form.get('masukan'),
    });

    if (res.status === 201) {
      setLoading(false);
      window.location.reload();
      notify('Berhasil Menambahkan rekomendasi');
    } else {
      setLoading(false);
      notify('Gagal Menambahkan rekomendasi');
    }
  };
  const handleputRekomendasi = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await putSubmitRekomendasi({
      id_kompilasi: form.get('id_kompilasi'),
      id_rekomendasi: form.get('id_rekomendasi'),
      masukan: form.get('masukan'),
    });

    if (res.status === 201) {
      setLoading(false);
      window.location.reload();
      notify('Berhasil Menambahkan rekomendasi');
    } else {
      setLoading(false);
      notify('Gagal Menambahkan rekomendasi');
    }
  };
  const handleSubmitRencanaAksi = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await postSubmitRencanaAksi({
      id_rekomendasi: form.get('id_rekomendasi'),
      masukan: form.get('masukan'),
    });

    if (res.status === 201) {
      setLoading(false);
      window.location.reload();
      notify('Berhasil Menambahkan rencana aksi');
    } else {
      setLoading(false);
      window.location.reload();
      notify('Gagal Menambahkan rencana aksi');
    }
  };

  const handlePutKompilasi = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await putSubmitKompilasi({
      id_kompilasi: form.get('id_kompilasi'),
      no_lhp: form.get('no_lhp'),
      kondisi: form.get('kondisi'),
      kriteria: form.get('kriteria'),
      sebab: form.get('sebab'),
      akibat: form.get('akibat'),
    });

    console.log(res);

    if (res.status === 200) {
      setLoading(false);
      setOpenDialogEdit(false);

      notify('Berhasil Update Kompilasi');
      window.location.reload();
    } else {
      setLoading(false);
      notify('Gagal Update Kompilasi');
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell />

        <TableCell>{index}</TableCell>
        <TableCell>{no_lhp}</TableCell>
        <TableCell>{kondisi}</TableCell>

        <TableCell>{kriteria}</TableCell>

        <TableCell>{sebab}</TableCell>
        <TableCell>{akibat}</TableCell>

        <TableCell>
          <Button variant="contained" color="success" onClick={handleClickOpenDialogRekomendasi}>
            LIHAT
          </Button>
        </TableCell>

        {user.role_id === 1 ||
          (user.role_id === 2 && (
            <TableCell align="center">
              <IconButton onClick={handleClickOpenDialog}>
                <Iconify icon="material-symbols:delete-outline" />
              </IconButton>
              <IconButton onClick={handleOpenDialogEdit}>
                <Iconify icon="tabler:edit" />
              </IconButton>
            </TableCell>
          ))}
      </TableRow>
      {/* dialog kompilasi */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Yakin ingin menghapus kompilasi ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleDeletePenugasan} autoFocus>
            Setuju
          </Button>
        </DialogActions>
      </Dialog>

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
      {/* Dialog Rekomendasi */}
      <Dialog
        open={openDialogRekomendasi}
        onClose={handleCloseDialogRekomendasi}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Rekomendasi</DialogTitle>
        <DialogContent>
          {user.role_id === 1 ||
            (user.role_id === 2 && (
              <form onSubmit={handleSubmitRekomendasi}>
                <TextField multiline rows={4} name="masukan" label="Rekomendasi" />
                <Button sx={{ mt: 1, ml: 2 }} variant="contained" type="submit">
                  Simpan
                </Button>
              </form>
            ))}
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Rekomendasi</TableCell>
                  <TableCell>Rencana Aksi</TableCell>
                  {user.role_id === 1 || (user.role_id === 2 && <TableCell>Aksi</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {allData.rekomendasis.map((data, i) => (
                  <TableRow>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{data.masukan}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleClickOpenDialogRencanaAksi(data)}
                      >
                        LIHAT
                      </Button>
                    </TableCell>
                    {user.role_id === 1 ||
                      (user.role_id === 2 && (
                        <TableCell>
                          {' '}
                          <IconButton onClick={() => handleOpenDialogDeleteRekomendasi(data.id)}>
                            <Iconify icon="material-symbols:delete-outline" />
                          </IconButton>
                          <IconButton onClick={handleOpenDialogEditRekomendasi}>
                            <Iconify icon="tabler:edit" />
                          </IconButton>{' '}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      {/* dialog delete rekomendasi */}
      <Dialog
        open={openDialogDeleteRekomendasi}
        onClose={handleCloseDialogDeleteRekomendasi}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Yakin ingin menghapus rekomendasi ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogDeleteRekomendasi}>Batal</Button>
          <Button onClick={handleDeleteRekomendasi} autoFocus>
            Setuju
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog rencana aksi */}
      <Dialog
        open={openDialogRencanaAksi}
        onClose={handleCloseDialogRencanaAksi}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Rencana Aksi</DialogTitle>
        <DialogContent>
          {user.role_id === 1 ||
            (user.role_id === 2 && (
              <form onSubmit={handleSubmitRencanaAksi}>
                <TextField type="hidden" value={idRekomendasi} name="id_rekomendasi" />
                <TextField multiline rows={4} name="masukan" label="Rencana Aksi" />
                <Button sx={{ mt: 1, ml: 2 }} variant="contained" type="submit">
                  Simpan
                </Button>
              </form>
            ))}
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Rencana Aksi</TableCell>
                  <TableCell>Waktu</TableCell>
                  {user.role_id === 1 || (user.role_id === 2 && <TableCell>Aksi</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataAksi.map((data, i) => (
                  <TableRow>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{data.masukan}</TableCell>
                    <TableCell>Waktu Pelaksanaan</TableCell>
                    {user.role_id === 1 ||
                      (user.role_id === 2 && (
                        <TableCell>
                          {' '}
                          <IconButton onClick={() => handleOpenDialogDeleteAksi(data.id)}>
                            <Iconify icon="material-symbols:delete-outline" />
                          </IconButton>
                          <IconButton onClick={handleOpen}>
                            <Iconify icon="tabler:edit" />
                          </IconButton>{' '}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      {/* dialog aksi */}
      <Dialog
        open={openDialogDeleteAksi}
        onClose={handleCloseDialogDeleteAksi}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Yakin ingin menghapus aksi ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogDeleteAksi}>Batal</Button>
          <Button onClick={handleDeleteAksi} autoFocus>
            Setuju
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog edit kompilasi */}
      <Dialog
        open={openDialogEdit}
        onClose={handleCloseDialogEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Kompilasi</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CardContent>
              <form onSubmit={handlePutKompilasi}>
                <Stack spacing={2}>
                  <TextField
                    name="id_kompilasi"
                    value={allData.id}
                    InputProps={{ readOnly: true }}
                    // sx={{ display: 'none' }}
                  />
                  <TextField
                    multiline
                    rows={4}
                    defaultValue={allData.no_lhp}
                    name="no_lhp"
                    label="No. LHP"
                  />
                  <TextField
                    multiline
                    rows={4}
                    defaultValue={allData.kondisi}
                    name="kondisi"
                    label="Kondisi"
                  />
                  <TextField
                    multiline
                    rows={4}
                    defaultValue={allData.sebab}
                    name="sebab"
                    label="Sebab"
                  />
                  <TextField
                    multiline
                    rows={4}
                    defaultValue={allData.kriteria}
                    name="kriteria"
                    label="Kriteria"
                  />
                  <TextField
                    multiline
                    rows={4}
                    defaultValue={allData.akibat}
                    name="akibat"
                    label="Akibat"
                  />
                  <Grid container justifyContent="flex-end">
                    <Button variant="contained" onClick={handleCloseDialogEdit}>
                      Batal
                    </Button>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Stack>
              </form>
            </CardContent>
          </LocalizationProvider>
        </DialogContent>
      </Dialog>

      {/* dialog edit rekomendasi */}
      <Dialog
        open={openDialogEditRekomendasi}
        onClose={handleCloseDialogEditRekomendasi}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Rekomendasi</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CardContent>
              <form onSubmit={handleputRekomendasi}>
                <Stack spacing={2}>
                  <TextField
                    name="id_kompilasi"
                    value={allData.rekomendasis.id_kompilasi}
                    InputProps={{ readOnly: true }}
                    // sx={{ display: 'none' }}
                  />
                  <TextField
                    name="id_rekomendasi"
                    value={allData.rekomendasis.id}
                    InputProps={{ readOnly: true }}
                    // sx={{ display: 'none' }}
                  />
                  <TextField
                    multiline
                    rows={4}
                    name="masukan"
                    defaultValue={allData.masukan}
                    label="Rekomendasi"
                  />
                  <Grid container justifyContent="flex-end">
                    <Button variant="contained" onClick={handleCloseDialogEdit}>
                      Batal
                    </Button>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Stack>
              </form>
            </CardContent>
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}

UserTableRow.propTypes = {
  index: PropTypes.any,
  id: PropTypes.any,
  no_lhp: PropTypes.any,
  kondisi: PropTypes.any,
  kriteria: PropTypes.any,
  sebab: PropTypes.any,
  akibat: PropTypes.any,
  allData: PropTypes.any,
  notify: PropTypes.any,
};
