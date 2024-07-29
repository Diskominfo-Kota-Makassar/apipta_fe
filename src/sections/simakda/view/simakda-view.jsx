import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/system/Unstable_Grid/Grid';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import dayjs from 'dayjs';

// import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import { getSimakda, getSKPDSimakda } from 'src/utils/api';
import { format, parseISO } from 'date-fns';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import realisasiList from './model_realisasi.json';
import skpdList from './model_skpd.json';

// ----------------------------------------------------------------------

export default function Simakda() {
  const notify = (comment) => toast(comment);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('nama');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [skpd, setSkpd] = useState('6.01.0.00.0.00.03.0000');

  const [skpdListAPI, setSkpdListAPI] = useState([]);
  const [simakdaList, setSimakdaList] = useState([]);

  const [selectedDate, setSelectedDate] = useState('2024-07-29T16:00:00.000Z');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: realisasiList.data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleChangeSkpd = (event) => {
    setSkpd(event.target.value);

    handleSimakdaFromAPI();
  };

  const handleSimakdaFromAPI = useCallback(async () => {
    const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : 'None';
    const simakda = await getSimakda({
      skpd_id: skpd,
      tanggal: formattedDate,
    });

    console.log(simakda);

    setSimakdaList(simakda.data);
  }, [skpd, selectedDate]);

  const handleSkpdFromAPI = async () => {
    const skpdl = await getSKPDSimakda();

    console.log(skpdl);

    setSkpdListAPI(skpdl.data);
  };

  useEffect(() => {
    handleSkpdFromAPI();
    handleSimakdaFromAPI();
  }, [handleSimakdaFromAPI]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">SIMAKDA</Typography>
      </Stack>

      <Card>
        {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="skpd">Pilih SKPD</InputLabel>
                <Select labelId="skpd" value={skpd} label="Pilih SKPD" onChange={handleChangeSkpd}>
                  {skpdList.data.map((option) => (
                    <MenuItem key={option.kd_skpd} value={option.kd_skpd}>
                      {' '}
                      {option.nm_skpd}{' '}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Pilih Tanggal"
                  name="tanggal"
                  selected={selectedDate}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Card>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={realisasiList.data}
                orderBy={orderBy}
                rowCount={realisasiList.data.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'no', label: 'NO' },
                  { id: 'skpd', label: 'SKPD' },
                  { id: 'sub_kegiatan', label: 'SUB KEGIATAN' },
                  { id: 'kode_rek', label: 'KODE REK' },
                  { id: 'nama_rek', label: 'NAMA REK' },
                  { id: 'anggaran', label: 'ANGGARAN' },
                  { id: 'realisasi', label: 'REALISASI' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow index={index + 1} id={row.kd_skpd} allData={row} />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={realisasiList.data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
