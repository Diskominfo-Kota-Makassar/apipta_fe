import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from '@mui/material';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import BukuTamuDetail from './view/detailpermohonan/bukutamu';
import KeteranganTidakMampuDetail from './view/detailpermohonan/keteranganTidakMampu';
import KeteranganBelumMenikahDetail from './view/detailpermohonan/keteranganBelumMenikah';
import KeteranganKelahiran from './view/detailpermohonan/keteranganKelahiran';
import KeteranganKewarisanDetail from './view/detailpermohonan/keteranganKewarisan';
import SuratMasuk from './view/detailpermohonan/suratMasuk';
import SuratKeluar from './view/detailpermohonan/suratKeluar';
import SerbaSerbi from './view/detailpermohonan/serbaSerbi';
import RegisterMenikah from './view/detailpermohonan/registerMenikah';
import KeteranganKematianDetail from './view/detailpermohonan/keteranganKematian';
import KeteranganPengesahanDetail from './view/detailpermohonan/keteranganPengesahan';
import KeteranganUsahaDetail from './view/detailpermohonan/keteranganUsaha';
import KeteranganDomisiliDetail from './view/detailpermohonan/keteranganDomisili';

// ----------------------------------------------------------------------

export default function UserTableRow({
  index,
  jenis_layanan,
  nama,
  nama_instansi,
  tanggal,
  keterangan,
  allData,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell />

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {jenis_layanan}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{nama ?? nama_instansi}</TableCell>

        <TableCell>{tanggal}</TableCell>

        <TableCell>{keterangan}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpen}>
            <Iconify icon="bx:show-alt" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog fullScreen={fullScreen} open={open} onClose={handleCloseMenu}>
        <DialogTitle>Detail Permohonan</DialogTitle>
        {allData.jenis_layanan === 'Buku Tamu' && <BukuTamuDetail rows={allData} />}
        {allData.jenis_layanan === 'Surat Keterangan Tidak Mampu' && (
          <KeteranganTidakMampuDetail rows={allData} />
        )}
        {allData.jenis_layanan === 'Surat Keterangan Belum Menikah' && (
          <KeteranganBelumMenikahDetail rows={allData} />
        )}
        {allData.jenis_layanan === 'Surat Keterangan Kelahiran' && (
          <KeteranganKelahiran rows={allData} />
        )}
        {allData.jenis_layanan === 'Surat Keterangan Domisili' && (
          <KeteranganDomisiliDetail rows={allData} />
        )}
        {allData.jenis_layanan === 'Surat Keterangan Kewarisan' && (
          <KeteranganKewarisanDetail rows={allData} />
        )}
        {allData.jenis_layanan === 'Surat Masuk' && <SuratMasuk rows={allData} />}
        {allData.jenis_layanan === 'Surat Keluar' && <SuratKeluar rows={allData} />}
        {allData.jenis_layanan === 'Serba-serbi' && <SerbaSerbi rows={allData} />}
        {allData.jenis_layanan === 'Register Menikah' && <RegisterMenikah rows={allData} />}
        {allData.jenis_layanan === 'Keterangan Kematian' && (
          <KeteranganKematianDetail rows={allData} />
        )}
        {allData.jenis_layanan === 'Keterangan Pengesahan' && (
          <KeteranganPengesahanDetail rows={allData} />
        )}
        {allData.jenis_layanan === 'Keterangan Usaha' && <KeteranganUsahaDetail rows={allData} />}
        <DialogActions>
          <Button onClick={handleCloseMenu}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UserTableRow.propTypes = {
  index: PropTypes.any,
  jenis_layanan: PropTypes.any,
  tanggal: PropTypes.any,
  nama: PropTypes.any,
  nama_instansi: PropTypes.any,
  keterangan: PropTypes.any,
  allData: PropTypes.any,
};
