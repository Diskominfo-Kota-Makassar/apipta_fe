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
import * as XLSX from 'xlsx';
// import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { getKompilasi } from 'src/utils/api';

// ----------------------------------------------------------------------

export default function LihatKompilasi() {
  const notify = (comment) => toast(comment);

  const [user, setUser] = useLocalStorage('user');
  const [allkompilasi, setAllKompilasi] = useState([]);
  const [rekomendasis, setRekomendasis] = useState([]);

  const handleAuditFromAPI = async () => {
    const kompilasi = await getKompilasi();
    console.log(kompilasi.data);
    setAllKompilasi(kompilasi.data);
  };

  const exportToExcel = (jsonData, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const preprocessData = (data) => {
    const result = [];

    // Headers
    const headers = [
      'Kondisi',
      'Kriteria',
      'Sebab',
      'Akibat',
      'No LHP',
      'Rekomendasi Masukan',
      'Aksi Masukan',
      'Tgl Pembuatan',
    ];
    result.push(headers);

    // Flatten each item
    data.forEach((item) => {
      item.rekomendasis.forEach((rekomendasi) => {
        rekomendasi.aksis.forEach((aksi) => {
          const row = [
            item.kondisi,
            item.kriteria,
            item.sebab,
            item.akibat,
            item.no_lhp,
            rekomendasi.masukan,
            aksi.masukan,
            item.createdAt,
          ];
          result.push(row);
        });
      });
    });

    return result;
  };

  const handleExport = () => {
    const preprocessedData = preprocessData(allkompilasi);
    exportToExcel(preprocessedData, 'Kompilasi-Audit');
  };

  useEffect(() => {
    handleAuditFromAPI();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Kompilasi Hasil Audit</Typography>

      <TableContainer sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleExport}
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
            {allkompilasi.map((kompilasi, index) => (
              <TableRow
                sx={{
                  borderBottom: '2px solid #E9E9E9',
                }}
                key={kompilasi.id}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{kompilasi.kondisi}</TableCell>
                <TableCell>{kompilasi.kriteria}</TableCell>
                <TableCell>{kompilasi.sebab}</TableCell>
                <TableCell>{kompilasi.akibat}</TableCell>
                <TableCell>
                  {kompilasi.rekomendasis.map((rekomendasi, i) => (
                    <TableRow
                      sx={{
                        borderBottom: '2px solid #E9E9E9',
                      }}
                      key={i}
                    >
                      <TableCell>{rekomendasi.masukan}</TableCell>
                    </TableRow>
                  ))}
                </TableCell>
                <TableCell>
                  {kompilasi.rekomendasis.map((rekomendasi, i) => (
                    <TableRow
                      sx={{
                        borderBottom: '2px solid #E9E9E9',
                      }}
                      key={i}
                    >
                      {rekomendasi.aksis.map((aksi, it) => (
                        <TableRow key={it}> {aksi.masukan} </TableRow>
                      ))}
                    </TableRow>
                  ))}
                </TableCell>
                <TableCell>{kompilasi.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Card />
    </Container>
  );
}
