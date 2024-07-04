import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { getPenugasanFromAPI } from 'src/utils/api';

import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function LihatKompilasi() {
  const notify = (comment) => toast(comment);

  const user = useLocalStorage('user');
  useEffect(() => {}, []);

  return (
    <Container>
      <Typography variant="h4">Kompilasi Hasil Audit</Typography>

      <TableContainer sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="inherit"
          // startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Donwload XLSX
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Kondisi</TableCell>
              <TableCell>Kriteria</TableCell>
              <TableCell>Sebab</TableCell>
              <TableCell>Akibat</TableCell>
              <TableCell>Rekomendasi</TableCell>
              <TableCell>Rencana Aksi</TableCell>
              <TableCell>Waktu Pelaksanaan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>
      <Card />
    </Container>
  );
}
