import { useState, useEffect } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { getAllPermohonan } from 'src/utils/api';
import { format } from 'date-fns';
import TableNoData from '../user/table-no-data';
import UserTableRow from '../user/user-table-row';
import UserTableHead from '../user/user-table-head';
import TableEmptyRows from '../user/table-empty-rows';
import UserTableToolbar from '../user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../user/utils';
// import { emptyRows } from '../user/utils';

// ----------------------------------------------------------------------

export default function UsersView() {
  // const [page, setPage] = useState(0);

  // const [order, setOrder] = useState('asc');

  // const [selected, setSelected] = useState([]);

  // const [orderBy, setOrderBy] = useState('nama');

  // const [filterName, setFilterName] = useState('');

  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [allPermohonan, setAllPermohonan] = useState([]);

  // const handleSort = (event, id) => {
  //   const isAsc = orderBy === id && order === 'asc';
  //   if (id !== '') {
  //     setOrder(isAsc ? 'desc' : 'asc');
  //     setOrderBy(id);
  //   }
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = users.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setPage(0);
  //   setRowsPerPage(parseInt(event.target.value, 10));
  // };

  // const handleFilterByName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };

  // const dataFiltered = applyFilter({
  //   inputData: allPermohonan,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  const router = useRouter();

  // const getAllPermohonanFromApi = async () => {
  //   const allLayanan = await getAllPermohonan();
  //   setAllPermohonan(allLayanan.data);
  // };

  // useEffect(() => {
  //   // getAllPermohonanFromApi();
  // }, []);

  return (
    <Container>
      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}> */}
      <Typography variant="h4" mb={2}>
        MASTER USER
      </Typography>

      <Button
        variant="contained"
        onClick={() => router.push('/users/tambah-user')}
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
        sx={{ mb: 2 }}
      >
        Tambah User
      </Button>
      {/* </Stack> */}

      <Card>
        <UserTableToolbar
          placeholder="Cari User"
          // numSelected={selected.length}
          // filterName={filterName}
          // onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                // order={order}
                // orderBy={orderBy}
                // rowCount={allPermohonan.length}
                // numSelected={selected.length}
                // onRequestSort={handleSort}
                // onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'jenis_layanan', label: 'Jenis Layanan' },
                  { id: 'nama', label: 'Nama/Instansi' },
                  { id: 'tanggal', label: 'Tanggal' },
                  { id: 'keterangan', label: 'Keterangan', align: 'center' },
                  { id: '', label: 'Aksi' },
                ]}
              />
              <TableBody>
                {/* {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      index={index + 1}
                      key={row.id}
                      jenis_layanan={row.jenis_layanan}
                      nama={row.nama}
                      nama_instansi={row.namaInstansiPengirim}
                      tanggal={
                        row.tanggal !== '' ? format(new Date(row.tanggal), 'dd/MM/yyyy') : ''
                      }
                      keterangan={row.keterangan}
                      allData={row}
                    />
                  ))} */}

                <TableEmptyRows
                  height={77}
                  // emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {/* {notFound && <TableNoData query={filterName} />} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {/* <TablePagination
          page={page}
          component="div"
          count={allPermohonan.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Card>
    </Container>
  );
}
