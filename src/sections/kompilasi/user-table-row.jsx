import { useState } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { useTheme } from '@mui/material/styles';

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
  CircularProgress,
  TableBody,
  TableContainer,
} from '@mui/material';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { deleteKompilasi } from 'src/utils/api';

// ----------------------------------------------------------------------

export default function UserTableRow({
  index,
  id,
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

  const router = useRouter();

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

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

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogRekomendasi, setOpenDialogRekomendasi] = useState(false);
  const [openDialogRencanaAksi, setOpenDialogRencanaAksi] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClickOpenDialogRekomendasi = () => {
    setOpenDialogRekomendasi(true);
  };

  const handleClickOpenDialogRencanaAksi = () => {
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

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell />

        <TableCell>{index}</TableCell>
        <TableCell>{kondisi}</TableCell>

        <TableCell>{kriteria}</TableCell>

        <TableCell>{sebab}</TableCell>
        <TableCell>{akibat}</TableCell>

        <TableCell>
          <Button variant="contained" color="success" onClick={handleClickOpenDialogRekomendasi}>
            LIHAT
          </Button>
        </TableCell>

        <TableCell align="center">
          <IconButton onClick={handleClickOpenDialog}>
            <Iconify icon="material-symbols:delete-outline" />
          </IconButton>
          <IconButton onClick={handleOpen}>
            <Iconify icon="tabler:edit" />
          </IconButton>
        </TableCell>
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
          <form>
            <TextField name="rekomendasi" label="Rekomendasi" />
            <Button sx={{ mt: 1, ml: 2 }} variant="contained" type="submit">
              Simpan
            </Button>
          </form>
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Rekomendasi</TableCell>
                  <TableCell>Rencana Aksi</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Rekomendasi</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleClickOpenDialogRencanaAksi}
                    >
                      LIHAT
                    </Button>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <IconButton onClick={handleClickOpenDialog}>
                      <Iconify icon="material-symbols:delete-outline" />
                    </IconButton>
                    <IconButton onClick={handleOpen}>
                      <Iconify icon="tabler:edit" />
                    </IconButton>{' '}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
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
          <form>
            <TextField name="rencana_aksi" label="Rencana Aksi" />
            <Button sx={{ mt: 1, ml: 2 }} variant="contained" type="submit">
              Simpan
            </Button>
          </form>
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Rencana Aksi</TableCell>
                  <TableCell>Waktu</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Rekomendasi</TableCell>
                  <TableCell>Waktu Pelaksanaan</TableCell>
                  <TableCell>
                    {' '}
                    <IconButton onClick={handleClickOpenDialog}>
                      <Iconify icon="material-symbols:delete-outline" />
                    </IconButton>
                    <IconButton onClick={handleOpen}>
                      <Iconify icon="tabler:edit" />
                    </IconButton>{' '}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}

UserTableRow.propTypes = {
  index: PropTypes.any,
  id: PropTypes.any,
  kondisi: PropTypes.any,
  kriteria: PropTypes.any,
  sebab: PropTypes.any,
  akibat: PropTypes.any,
  allData: PropTypes.any,
  notify: PropTypes.any,
};
