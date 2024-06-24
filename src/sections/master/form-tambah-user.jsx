import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { TextField, CircularProgress, useMediaQuery, useTheme } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';

import { Icon } from '@iconify/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Iconify from 'src/components/iconify';
import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { postForm, getLayanan } from 'src/utils/api';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
// ----------------------------------------------------------------------

export default function FormTambahUser() {
  const notify = (comment) => toast(comment);

  const [listLayanan, setListLayanan] = useState([{ id: 1, nama: 'Buku Tamu' }]);
  const [namaLayanan, setNamaLayanan] = useState('Buku Tamu');

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  //   const handleClick = () => {
  //     console.info(`You clicked ${options[selectedIndex]}`);
  //   };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    const namaLayananApi = listLayanan[index].nama;
    setNamaLayanan(namaLayananApi);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const jenis_layanan = namaLayanan;

    const res = 200;

    if (res.status === 200) {
      setLoading(false);
      notify('Berhasil Menambahkan');
    } else {
      setLoading(false);
      notify('Gagal Menambahkan');
    }
  };

  const getJenisLayanan = async () => {
    const jenisLayanan = await getLayanan();
    setListLayanan(jenisLayanan);
  };

  useEffect(() => {
    // getJenisLayanan();
  }, []);

  const renderDropDownButton = (
    <>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="Button group with a nested menu">
        {/* <Button onClick={handleClick}>{options[selectedIndex]}</Button> */}
        {/* <Button></Button> */}
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <Icon icon="mdi-light:chevron-down" width={30} />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {listLayanan.map((option, index) => (
                    <MenuItem
                      key={option.id}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.nama}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Form Permohonan</Typography>

        <Button
          variant="contained"
          onClick={() => window.history.back()}
          color="inherit"
          startIcon={<Iconify icon="icon-park-outline:back" />}
        >
          Kembali
        </Button>
      </Stack>

      <CardContent>{renderDropDownButton}</CardContent>

      <ToastContainer position="top-center" />

      <Stack>
        <Card>
          <Grid container>
            <Grid item sm={12} md={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>{}</LocalizationProvider>
            </Grid>
          </Grid>
        </Card>
      </Stack>
      {loading && (
        <CircularProgress
          size={48}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Container>
  );
}
