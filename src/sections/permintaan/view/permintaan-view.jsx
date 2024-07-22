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
import { toast, ToastContainer } from 'react-toastify';

import { getPermintaanFromAPI, getPenugasanFromAPI } from 'src/utils/api';
import { format } from 'date-fns';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function PermintaanPage() {
  const notify = (comment) => toast(comment);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('nama');

  const [filterName, setFilterName] = useState('');

  const [user, setUser] = useLocalStorage('user');
  const suratTugasTerpilih = user.surat_tugas;

  const [noST, setNoST] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [allPermintaan, setAllPermintaan] = useState([]);

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
    inputData: allPermintaan,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const router = useRouter();

  const handlePermintaanFromAPI = useCallback(async () => {
    const permintaan = await getPermintaanFromAPI();

    console.log(permintaan.data);
    console.log(noST);

    const prm = permintaan.data.filter((p) => p.no === noST);
    setAllPermintaan(prm);
  }, [noST]);

  const handlePenugasanFromAPI = useCallback(async () => {
    try {
      const penugasan = await getPenugasanFromAPI();
      const no_tugas = penugasan.data.find((pgs) => pgs.id === suratTugasTerpilih);
      setNoST(no_tugas.no);
    } catch (error) {
      console.error('Error fetching penugasan data:', error);
      // Handle error appropriately
    }
  }, [suratTugasTerpilih]);

  useEffect(() => {
    handlePenugasanFromAPI();
    handlePermintaanFromAPI();
  }, [handlePermintaanFromAPI, handlePenugasanFromAPI]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Form Daftar Permintaan</Typography>

        {(user.role_id !== 5 || user.role_id !== 6) && (
          <Button
            variant="contained"
            onClick={() => router.push('/permintaan/tambah-permintaan')}
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Tambah Permintaan
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
                rowCount={allPermintaan.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: '', label: 'NO' },
                  { id: 'no', label: 'NO.ST' },
                  { id: 'tgl', label: 'TGL.ST' },
                  { id: 'uraian', label: 'URAIAN.ST' },
                  { id: 'no_ref_kka', label: 'NO.REF KKA' },
                  { id: 'no_ref_pka', label: 'NO.REF PKA' },
                  { id: 'judul_dokumen', label: 'Judul Dokumen' },
                  { id: '', label: 'Validasi', align: 'center' },
                  { id: '', label: 'Aksi' },
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
                      judul_doc={row.judul_doc}
                      no={row.no}
                      tgl_penugasan={row.tgl_penugasan}
                      no_ref_kka={row.no_ref_kka}
                      no_ref_pka={row.no_ref_pka}
                      status={row.status === 1}
                      uraian={row.uraian}
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
          count={allPermintaan.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
