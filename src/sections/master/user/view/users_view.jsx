import { useState, useEffect } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { getUsersFromAPI } from 'src/utils/api';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';

// ----------------------------------------------------------------------

export default function UsersView() {
  const notify = (comment) => toast(comment);

  const [usersList, setUsersList] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('nama');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [allPermohonan, setAllPermohonan] = useState([]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

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

  const handleRolesFromAPI = async () => {
    const users = await getUsersFromAPI();
    setUsersList(users.data);
  };

  useEffect(() => {
    handleRolesFromAPI();
  }, []);

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
                order={order}
                // orderBy={orderBy}
                // rowCount={allPermohonan.length}
                // numSelected={selected.length}
                // onRequestSort={handleSort}
                // onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'no', label: 'No' },
                  { id: 'nama', label: 'Nama' },
                  { id: 'username', label: 'Username' },
                  { id: 'entitas', label: 'Entitas' },
                  { id: 'email', label: 'Email' },
                  { id: 'nip', label: 'NIP' },
                  { id: 'catatan', label: 'Catatan', align: 'center' },
                  { id: '', label: 'Aksi' },
                ]}
              />
              <TableBody>
                {usersList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      index={index + 1}
                      id={row.id}
                      key={row.id}
                      nama={row.nama}
                      username={row.username}
                      entitas={row.entitas}
                      masa_berlaku={row.masa_berlaku}
                      email={row.email}
                      nip={row.nip}
                      catatan="-"
                      notify={notify}
                      allData={row}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  // emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {/* {notFound && <TableNoData query={filterName} />} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={usersList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <ToastContainer position="top-center" />
    </Container>
  );
}
