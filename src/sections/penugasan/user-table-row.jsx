import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from '@mui/material';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function UserTableRow({
  index,
  no,
  tgl,
  uraian,
  pj_id,
  tgl_mulai,
  tgl_berakhir,
  allData,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell />

        <TableCell>{index}</TableCell>
        <TableCell>{no}</TableCell>

        <TableCell>{tgl}</TableCell>

        <TableCell>{uraian}</TableCell>
        <TableCell>{pj_id}</TableCell>
        <TableCell>{tgl_mulai}</TableCell>
        <TableCell>{tgl_berakhir}</TableCell>
        <TableCell />
        <TableCell align="right">
          <IconButton onClick={handleOpen}>
            <Iconify icon="bx:show-alt" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

UserTableRow.propTypes = {
  index: PropTypes.any,
  no: PropTypes.any,
  tgl: PropTypes.any,
  uraian: PropTypes.any,
  pj_id: PropTypes.any,
  tgl_mulai: PropTypes.any,
  tgl_berakhir: PropTypes.any,
  allData: PropTypes.any,
};
