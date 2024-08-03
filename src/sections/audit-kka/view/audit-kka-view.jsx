import { useState, useEffect, useCallback } from 'react';
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
import { TextField, Grid } from '@mui/material';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import {
  getAuditFromAPI,
  handlePostFileAudit,
  handlePostFileAuditBPKP,
  getFileAuditFromAPI,
  baseURL,
  fileBaseURL,
  getPenugasanFromAPI,
  putSubmitCatatanPenugasan,
} from 'src/utils/api';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function AuditKKA() {
  const notify = (comment) => toast(comment);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('nama');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [allAudit, setAllAudit] = useState([]);

  const [user, setUser] = useLocalStorage('user');

  const [allPenugasan, setAllPenugasan] = useState([]);

  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const [catatan_pj, setCatatan_pj] = useState('');
  const [catatan_kpk, setCatatan_kpk] = useState('');

  const suratTugasTerpilih = user.surat_tugas;

  const [valueDraftNaskah, setValueDraftNaskah] = useState(null);
  const [valueDraftNaskahBPKP, setValueDraftNaskahBPKP] = useState(null);
  const [valueDraftNaskahFromAPI, setValueDraftNaskahFromAPI] = useState([
    {
      file: null,
    },
    {
      file: null,
    },
    {
      file: null,
    },
  ]);

  const [loading, setLoading] = useState(false);

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

  const handleChangeDraftNaskah = (newValue) => {
    setValueDraftNaskah(newValue);
  };
  const handleChangeDraftNaskahBPKP = (newValue) => {
    setValueDraftNaskahBPKP(newValue);
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

  const handleSubmitFile = async (event) => {
    event.preventDefault();
    setLoading(true);

    const res = await handlePostFileAudit({
      file: valueDraftNaskah,
      user_id: user.user_id,
      penugasan_id: user.surat_tugas,
    });

    if (res.status === 201) {
      setLoading(false);
      window.location.reload();
      notify('Berhasil Menambahkan File Draft');
    } else {
      setLoading(false);
      notify('Gagal Menambahkan File Draft');
    }
  };

  const handleAuditFromAPI = useCallback(async () => {
    const audit = await getAuditFromAPI({ id_penugasan: suratTugasTerpilih });

    console.log(audit.data);

    if (audit.data !== null && user.role_id === 3) {
      const newAudit = audit.data.filter((item) => item.tim_anggota.includes(user.user_id));
      setAllAudit(newAudit);
    }

    if (audit.data !== null && user.role_id !== 3) {
      setAllAudit(audit.data);
    }
  }, [suratTugasTerpilih, user]);

  const handleFileAuditFromAPI = useCallback(async () => {
    // const st_id = user.surat_tugas;
    const file = await getFileAuditFromAPI({ id_surat_tugas: suratTugasTerpilih });

    console.log('file', file.data);

    setValueDraftNaskahFromAPI(file.data);
  }, [suratTugasTerpilih]);

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
        setCatatan_kpk(penugasanTerpilih.catatan_kpk);
        setCatatan_pj(penugasanTerpilih.catatan_pj);
        setAllPenugasan([penugasanTerpilih]);
      } else {
        setAllPenugasan([]);
      }
    } catch (error) {
      console.error('Error fetching penugasan data:', error);
      // Handle error appropriately
    }
  }, [user]);

  const handlePutCatatanPenugasanKPK = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await putSubmitCatatanPenugasan({
      id_penugasan: form.get('id_penugasan'),
      catatan_kpk: form.get('catatan_kpk'),
    });

    if (res.status === 200) {
      setOpenDialogEdit(false);
      setLoading(false);
      notify('Berhasil Edit Pengujian');
      handlePenugasanFromAPI();
    } else {
      setLoading(false);
      notify('Gagal Edit Pengujian');
    }
  };
  const handlePutCatatanPenugasanPJ = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const res = await putSubmitCatatanPenugasan({
      id_penugasan: form.get('id_penugasan'),
      catatan_pj: form.get('catatan_pj'),
    });

    if (res.status === 200) {
      setOpenDialogEdit(false);
      setLoading(false);
      notify('Berhasil Edit Pengujian');
    } else {
      setLoading(false);
      notify('Gagal Edit Pengujian');
    }
  };

  console.log('all penugasan', allPenugasan);
  console.log('catatan kpk', catatan_kpk);
  console.log('catatan pj', catatan_pj);

  useEffect(() => {
    handleFileAuditFromAPI();
    handlePenugasanFromAPI();
    handleAuditFromAPI();
  }, [handleAuditFromAPI, handleFileAuditFromAPI, handlePenugasanFromAPI]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">List Pengujian</Typography>

        {(user.role_id !== 1 && user.role_id !== 2) || (
          <Button
            variant="contained"
            onClick={() => router.push('/audit-kka/tambah-audit-kka')}
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Tambah Pengujian
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

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 0 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form onSubmit={handleSubmitFile}>
            <MuiFileInput
              sx={{ mr: 3 }}
              name="draft_naskah"
              placeholder="Pilih File Draft Naskah"
              value={valueDraftNaskah}
              onChange={handleChangeDraftNaskah}
            />
            <Button sx={{ mt: 1 }} type="submit" variant="contained">
              {' '}
              Simpan{' '}
            </Button>
          </form>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 1 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/inspektorat/${valueDraftNaskahFromAPI[0].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Draft Naskah{' '}
          </Button>
        </Card>
      )}

      {/* file session dalnis */}
      {user.role_id === 8 && valueDraftNaskahFromAPI.length !== 0 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/inspektorat/${valueDraftNaskahFromAPI[0].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Draft Naskah{' '}
          </Button>
        </Card>
      )}

      {user.role_id === 8 && valueDraftNaskahFromAPI.length >= 4 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[3].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Laporan QA BPKP
          </Button>
        </Card>
      )}

      {user.role_id === 8 && valueDraftNaskahFromAPI.length >= 5 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[4].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Naskah hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 8 && valueDraftNaskahFromAPI.length >= 6 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[5].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File surat tanggapan obrik
          </Button>
        </Card>
      )}

      {user.role_id === 8 && valueDraftNaskahFromAPI.length >= 7 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[6].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File draft laporan hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 8 && valueDraftNaskahFromAPI.length !== 0 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form>
            <TextField
              multiline
              rows={4}
              value={catatan_pj !== null ? catatan_pj : 'Belum ada catatan PJ'}
              label="Catatan Reviu Penanggung Jawab"
              sx={{ width: '70%' }}
            />
          </form>
        </Card>
      )}

      {user.role_id === 8 && valueDraftNaskahFromAPI.length >= 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[7].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File laporan hasil audit (final)
          </Button>
        </Card>
      )}

      {user.role_id === 8 && valueDraftNaskahFromAPI.length >= 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form>
            <TextField
              multiline
              rows={4}
              value={catatan_kpk}
              name="catatan_kpk"
              label="Catatan Reviu KPK"
              sx={{ width: '70%' }}
            />
          </form>
        </Card>
      )}

      {/* file session wpj */}

      {user.role_id === 4 && valueDraftNaskahFromAPI.length !== 0 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/inspektorat/${valueDraftNaskahFromAPI[0].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Draft Naskah{' '}
          </Button>
        </Card>
      )}

      {user.role_id === 4 && valueDraftNaskahFromAPI.length >= 4 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[3].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Laporan QA BPKP
          </Button>
        </Card>
      )}

      {user.role_id === 4 && valueDraftNaskahFromAPI.length >= 5 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[4].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Naskah hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 4 && valueDraftNaskahFromAPI.length >= 6 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[5].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File surat tanggapan obrik
          </Button>
        </Card>
      )}

      {user.role_id === 4 && valueDraftNaskahFromAPI.length >= 7 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[6].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File draft laporan hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 4 && valueDraftNaskahFromAPI.length !== 0 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form>
            <TextField
              multiline
              rows={4}
              value={catatan_pj !== null ? catatan_pj : 'Belum ada catatan PJ'}
              label="Catatan Reviu Penanggung Jawab"
              sx={{ width: '70%' }}
            />
          </form>
        </Card>
      )}

      {user.role_id === 4 && valueDraftNaskahFromAPI.length >= 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[7].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File laporan hasil audit (final)
          </Button>
        </Card>
      )}

      {user.role_id === 4 && valueDraftNaskahFromAPI.length >= 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form>
            <TextField
              multiline
              rows={4}
              value={catatan_kpk}
              name="catatan_kpk"
              label="Catatan Reviu KPK"
              sx={{ width: '70%' }}
            />
          </form>
        </Card>
      )}

      {/* end wpj */}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 1 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form onSubmit={handleSubmitFile}>
            <MuiFileInput
              sx={{ mr: 3 }}
              name="draft_naskah"
              placeholder="Pilih File Draft Naskah (Revisi)"
              value={valueDraftNaskah}
              onChange={handleChangeDraftNaskah}
            />
            <Button sx={{ mt: 1 }} type="submit" variant="contained">
              {' '}
              Simpan{' '}
            </Button>
          </form>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 2 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[0].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Draft Naskah{' '}
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 2 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[1].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Draft Naskah (Revisi){' '}
          </Button>
        </Card>
      )}

      {/* session user bpkp */}
      {user.role_id === 6 &&
        valueDraftNaskahFromAPI.length === 1 &&
        valueDraftNaskahFromAPI.length !== 3 && (
          <Card sx={{ mt: 3, p: 3 }}>
            <Button sx={{ mt: 1 }} variant="contained">
              {' '}
              KT Belum mengupload naskah revisi
            </Button>
          </Card>
        )}

      {user.role_id === 6 && valueDraftNaskahFromAPI.length !== 1 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[1].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View Draft Naskah (Revisi)
          </Button>
        </Card>
      )}

      {user.role_id === 6 && valueDraftNaskahFromAPI.length === 2 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form onSubmit={handleSubmitFile}>
            <MuiFileInput
              sx={{ mr: 3 }}
              name="file"
              placeholder="Surat Tugas BPKP"
              value={valueDraftNaskah}
              onChange={handleChangeDraftNaskah}
            />
            <Button sx={{ mt: 1 }} type="submit" variant="contained">
              {' '}
              Simpan{' '}
            </Button>
          </form>
        </Card>
      )}

      {user.role_id === 6 &&
        valueDraftNaskahFromAPI.length !== 2 &&
        valueDraftNaskahFromAPI.length !== 1 && (
          <Card sx={{ mt: 3, p: 3 }}>
            <Button
              sx={{ mt: 1 }}
              onClick={() =>
                window.open(
                  `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[2].file}`,
                  '_blank'
                )
              }
              variant="contained"
            >
              {' '}
              Surat Tugas BPKP
            </Button>
          </Card>
        )}

      {user.role_id === 6 && valueDraftNaskahFromAPI.length === 3 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form onSubmit={handleSubmitFile}>
            <MuiFileInput
              sx={{ mr: 3 }}
              name="file"
              placeholder="Berita Acara QA BPKP"
              value={valueDraftNaskah}
              onChange={handleChangeDraftNaskah}
            />
            <Button sx={{ mt: 1 }} type="submit" variant="contained">
              {' '}
              Simpan{' '}
            </Button>
          </form>
        </Card>
      )}

      {user.role_id === 6 &&
        valueDraftNaskahFromAPI.length !== 2 &&
        valueDraftNaskahFromAPI.length !== 1 && (
          <Card sx={{ mt: 3, p: 3 }}>
            <Button
              sx={{ mt: 1 }}
              onClick={() =>
                window.open(
                  `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[2].file}`,
                  '_blank'
                )
              }
              variant="contained"
            >
              {' '}
              Surat Tugas BPKP
            </Button>
          </Card>
        )}

      {user.role_id === 6 &&
        valueDraftNaskahFromAPI.length !== 2 &&
        valueDraftNaskahFromAPI.length !== 1 && (
          <Card sx={{ mt: 3, p: 3 }}>
            <Button
              sx={{ mt: 1 }}
              onClick={() =>
                window.open(
                  `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[2].file}`,
                  '_blank'
                )
              }
              variant="contained"
            >
              {' '}
              Berita acara QA bpkp
            </Button>
          </Card>
        )}

      {/* end session bpkp */}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 4 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[1].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Draft Naskah hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 2 &&
        valueDraftNaskahFromAPI.length !== 2 &&
        valueDraftNaskahFromAPI.length !== 1 && (
          <Card sx={{ mt: 3, p: 3 }}>
            <Button
              sx={{ mt: 1 }}
              onClick={() =>
                window.open(
                  `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[2].file}`,
                  '_blank'
                )
              }
              variant="contained"
            >
              {' '}
              View Surat Tugas BPKP
            </Button>
          </Card>
        )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 4 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[3].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Laporan QA BPKP
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 4 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form onSubmit={handleSubmitFile}>
            <MuiFileInput
              sx={{ mr: 3 }}
              name="draft_naskah"
              placeholder="Naskah hasil audit"
              value={valueDraftNaskah}
              onChange={handleChangeDraftNaskah}
            />
            <Button sx={{ mt: 1 }} type="submit" variant="contained">
              {' '}
              Simpan{' '}
            </Button>
          </form>
        </Card>
      )}

      {/* after bpkp upload */}
      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 5 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[1].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Draft Naskah
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 5 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[3].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Laporan QA BPKP
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 5 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[4].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Naskah hasil audit
          </Button>
        </Card>
      )}

      {/* session obrik */}

      {user.role_id === 5 && valueDraftNaskahFromAPI.length === 4 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button sx={{ mt: 1 }} variant="contained">
            {' '}
            KT Belum mengupload naskah hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 5 &&
        valueDraftNaskahFromAPI.length === 5 &&
        valueDraftNaskahFromAPI.length !== 4 &&
        valueDraftNaskahFromAPI.length !== 3 && (
          <Card sx={{ mt: 3, p: 3 }}>
            <Button
              sx={{ mt: 1 }}
              onClick={() =>
                window.open(
                  `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[4].file}`,
                  '_blank'
                )
              }
              variant="contained"
            >
              {' '}
              View File Naskah hasil audit
            </Button>
          </Card>
        )}

      {user.role_id === 5 &&
        valueDraftNaskahFromAPI.length === 5 &&
        valueDraftNaskahFromAPI.length !== 4 &&
        valueDraftNaskahFromAPI.length !== 3 && (
          <Card sx={{ mt: 3, p: 3 }}>
            <form onSubmit={handleSubmitFile}>
              <MuiFileInput
                sx={{ mr: 3 }}
                name="draft_naskah"
                placeholder="Surat tanggapan obrik"
                value={valueDraftNaskah}
                onChange={handleChangeDraftNaskah}
              />
              <Button sx={{ mt: 1 }} type="submit" variant="contained">
                {' '}
                Simpan{' '}
              </Button>
            </form>
          </Card>
        )}

      {/* after obrik upload */}

      {user.role_id === 5 && valueDraftNaskahFromAPI.length !== 5 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[4].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Naskah hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 5 && valueDraftNaskahFromAPI.length !== 5 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[5].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File surat tanggapan obrik
          </Button>
        </Card>
      )}

      {/* end obrik session */}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 6 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[4].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Naskah hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 6 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[5].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File surat tanggapan obrik
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 6 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form onSubmit={handleSubmitFile}>
            <MuiFileInput
              sx={{ mr: 3 }}
              name="draft_naskah"
              placeholder="Pilih draf laporan hasil audit"
              value={valueDraftNaskah}
              onChange={handleChangeDraftNaskah}
            />
            <Button sx={{ mt: 1 }} type="submit" variant="contained">
              {' '}
              Simpan{' '}
            </Button>
          </form>
        </Card>
      )}

      {/* after kt upload file */}
      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 7 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/inspektorat/${valueDraftNaskahFromAPI[0].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Draft Naskah{' '}
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 7 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[3].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Laporan QA BPKP
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 7 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[4].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Naskah hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 7 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[5].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File surat tanggapan obrik
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 7 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[6].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File draft laporan hasil audit
          </Button>
        </Card>
      )}

      {/* session pj */}

      {user.role_id === 7 && valueDraftNaskahFromAPI.length !== 6 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/inspektorat/${valueDraftNaskahFromAPI[0].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Draft Naskah{' '}
          </Button>
        </Card>
      )}

      {user.role_id === 7 && valueDraftNaskahFromAPI.length !== 6 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[3].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Laporan QA BPKP
          </Button>
        </Card>
      )}

      {user.role_id === 7 && valueDraftNaskahFromAPI.length !== 6 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[4].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Naskah hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 7 && valueDraftNaskahFromAPI.length !== 6 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[5].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File surat tanggapan obrik
          </Button>
        </Card>
      )}

      {user.role_id === 7 && valueDraftNaskahFromAPI.length !== 6 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[6].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File draft laporan hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 7 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[2].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View Surat Tugas BPKP
          </Button>
        </Card>
      )}

      {user.role_id === 7 && valueDraftNaskahFromAPI.length !== 0 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form onSubmit={handlePutCatatanPenugasanPJ}>
            <TextField name="id_penugasan" value={user.surat_tugas} sx={{ display: 'none' }} />
            <TextField
              multiline
              rows={4}
              name="catatan_pj"
              defaultValue={catatan_pj !== null ? catatan_pj : 'Belum ada catatan PJ'}
              label="Catatan Reviu Penanggung Jawab"
              sx={{ width: '70%' }}
            />
            <Button variant="contained" type="submit">
              Simpan
            </Button>
          </form>
        </Card>
      )}

      {user.role_id === 7 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[7].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File laporan hasil audit (final)
          </Button>
        </Card>
      )}

      {user.role_id === 7 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form>
            <TextField
              multiline
              rows={4}
              value={catatan_kpk}
              name="catatan_kpk"
              label="Catatan Reviu KPK"
              sx={{ width: '70%' }}
            />
          </form>
        </Card>
      )}

      {/* end session pj */}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 7 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form>
            <TextField
              multiline
              rows={4}
              value={catatan_pj !== null ? catatan_pj : 'Belum ada catatan PJ'}
              label="Catatan Reviu Penanggung Jawab"
              sx={{ width: '70%' }}
            />
          </form>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 7 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form onSubmit={handleSubmitFile}>
            <MuiFileInput
              sx={{ mr: 3 }}
              name="draft_naskah"
              placeholder="Pilih draf laporan hasil audit (final)"
              value={valueDraftNaskah}
              onChange={handleChangeDraftNaskah}
            />
            <Button sx={{ mt: 1 }} type="submit" variant="contained">
              {' '}
              Simpan{' '}
            </Button>
          </form>
        </Card>
      )}

      {/* after kt upload file final */}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/inspektorat/${valueDraftNaskahFromAPI[0].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Draft Naskah{' '}
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[3].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Laporan QA BPKP
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[4].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Naskah hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[5].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File surat tanggapan obrik
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[6].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File draft laporan hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form>
            <TextField
              multiline
              rows={4}
              value={catatan_pj !== null ? catatan_pj : 'Belum ada catatan PJ'}
              label="Catatan Reviu Penanggung Jawab"
              sx={{ width: '70%' }}
            />
          </form>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length >= 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[7].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File laporan hasil audit (final)
          </Button>
        </Card>
      )}

      {user.role_id === 2 && valueDraftNaskahFromAPI.length >= 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form>
            <TextField
              multiline
              rows={4}
              value={catatan_kpk}
              name="catatan_kpk"
              label="Catatan Reviu KPK"
              sx={{ width: '70%' }}
            />
          </form>
        </Card>
      )}

      {/* session kpk */}
      {user.role_id === 9 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/inspektorat/${valueDraftNaskahFromAPI[0].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Draft Naskah{' '}
          </Button>
        </Card>
      )}

      {user.role_id === 9 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[3].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Laporan QA BPKP
          </Button>
        </Card>
      )}

      {user.role_id === 9 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[4].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File Naskah hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 9 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[5].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File surat tanggapan obrik
          </Button>
        </Card>
      )}

      {user.role_id === 9 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[6].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File draft laporan hasil audit
          </Button>
        </Card>
      )}

      {user.role_id === 9 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form>
            <TextField
              multiline
              rows={4}
              value={catatan_pj !== null ? catatan_pj : 'Belum ada catatan PJ'}
              label="Catatan Reviu Penanggung Jawab"
              sx={{ width: '70%' }}
            />
          </form>
        </Card>
      )}

      {user.role_id === 9 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() =>
              window.open(
                `${fileBaseURL}/file/inspektorat/${valueDraftNaskahFromAPI[7].file}`,
                '_blank'
              )
            }
            variant="contained"
          >
            {' '}
            View File laporan hasil audit (final)
          </Button>
        </Card>
      )}

      {user.role_id === 9 && valueDraftNaskahFromAPI.length === 8 && (
        <Card sx={{ mt: 3, p: 3 }}>
          <form onSubmit={handlePutCatatanPenugasanKPK}>
            <TextField name="id_penugasan" value={user.surat_tugas} sx={{ display: 'none' }} />
            <TextField
              multiline
              rows={4}
              defaultValue={catatan_kpk}
              name="catatan_kpk"
              label="Catatan Reviu KPK"
              sx={{ width: '70%' }}
            />

            <Button variant="contained" type="submit">
              Simpan
            </Button>
          </form>
        </Card>
      )}
      <ToastContainer position="top-center" />
    </Container>
  );
}
