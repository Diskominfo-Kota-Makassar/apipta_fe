import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';

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

// import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { getPenugasanFromAPI } from 'src/utils/api';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function PermohonanPage() {
  const notify = (comment) => toast(comment);

  const [user, setUser] = useLocalStorage('user');

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('nama');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [allPenugasan, setAllPenugasan] = useState([]);

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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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
    inputData: allPenugasan,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const router = useRouter();

  const handlePenugasanFromAPI = useCallback(async () => {
    try {
      const penugasan = await getPenugasanFromAPI();

      if (user.role_id === 1) {
        setAllPenugasan(penugasan.data);
        return;
      }

      if (user.surat_tugas !== '') {
        const id_surat_dipilih = user.surat_tugas;
        const penugasanTerpilih = penugasan.data.find((option) => option.id === id_surat_dipilih);
        setAllPenugasan([penugasanTerpilih]);
      } else {
        setAllPenugasan([]);
      }
    } catch (error) {
      console.error('Error fetching penugasan data:', error);
      // Handle error appropriately
    }
  }, [user]);

  useEffect(() => {
    handlePenugasanFromAPI();
  }, [handlePenugasanFromAPI]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Penugasan</Typography>

        {user.role_id === 1 && (
          <Button
            variant="contained"
            onClick={() => router.push('/penugasan/tambah-penugasan')}
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Tambah Penugasan
          </Button>
        )}
      </Stack>

      <Card>
        {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={allPenugasan.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: '', label: 'NO' },
                  { id: 'no', label: 'NO.ST' },
                  { id: 'tgl', label: 'TGL.ST' },
                  { id: 'uraian', label: 'URAIAN.ST' },
                  { id: 'pj_id', label: 'PJ' },
                  { id: 'tgl_mulai', label: 'TANGGAL MULAI' },
                  { id: 'tgl_berakhir', label: 'TANGGAL BERAKHIR' },
                  { id: 'keterangan', label: 'STATUS', align: 'center' },
                  { id: '', label: 'AKSI' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      index={index + 1}
                      key={row.id}
                      id={row.id}
                      no={row.no}
                      tgl={row.tgl}
                      uraian={row.uraian}
                      pj_id={row.pj_id}
                      tgl_mulai={row.tgl_mulai}
                      tgl_berakhir={row.tgl_berakhir}
                      keterangan={row.keterangan}
                      notify={notify}
                      allData={row}
                    />
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
          count={allPenugasan.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
