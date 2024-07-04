import { useState, useEffect } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { MuiFileInput } from 'mui-file-input';
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

import { getAuditFromAPI } from 'src/utils/api';
import { format } from 'date-fns';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function AuditKKA() {
  const notify = (comment) => toast(comment);

  const [page, setPage] = useState(0);

  const user = useLocalStorage('user');

  console.log(user);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('nama');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [allAudit, setAllAudit] = useState([]);

  const [valueDraftNaskah, setValueDraftNaskah] = useState(null);

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

  const handleChangeDraftNaskah = (newValue) => {
    setValueDraftNaskah(newValue);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: allAudit,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const router = useRouter();

  const handleAuditFromAPI = async () => {
    const audit = await getAuditFromAPI();
    console.log(audit);
    setAllAudit(audit.data);
  };

  useEffect(() => {
    handleAuditFromAPI();
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">List Audit KKA</Typography>

        <Button
          variant="contained"
          onClick={() => router.push('/audit-kka/tambah-audit-kka')}
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Tambah KKA
        </Button>
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
                rowCount={allAudit.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'no', label: 'NO' },
                  { id: 'no_ref_kka', label: 'NO.REF KKA' },
                  { id: 'no_ref_pka', label: 'NO.REF PKA' },
                  { id: 'judul', label: 'Uraian KKA' },
                  { id: 'ket', label: 'Keterangan' },
                  { id: '', label: 'Aksi' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      index={index + 1}
                      id={row.id}
                      no_ref_kka={row.no_ref_kka}
                      no_ref_pka={row.no_ref_pka}
                      uraian={row.judul}
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
          count={allAudit.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {user[0].role_id === 2 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <MuiFileInput
            sx={{ mr: 3 }}
            name="draft_naskah"
            placeholder="Draft Naskah"
            value={valueDraftNaskah}
            onChange={handleChangeDraftNaskah}
          />
          <Button sx={{ mt: 1 }} type="submit" variant="contained">
            {' '}
            Simpan{' '}
          </Button>
        </Card>
      )}
      {user[0].role_id === 8 ||
        (user[0].role_id === 4 && (
          <Card sx={{ mt: 3, p: 3 }}>
            <Button sx={{ mt: 1 }} type="submit" variant="contained">
              {' '}
              View File Draft Naskah{' '}
            </Button>
          </Card>
        ))}
    </Container>
  );
}
