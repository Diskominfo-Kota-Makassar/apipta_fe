import { useState } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { useTheme } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';

import {
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  CircularProgress,
  TableBody,
  TableContainer,
} from '@mui/material';

// ----------------------------------------------------------------------

export default function UserTableRow({ index, allData, id }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

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
        <TableCell>{allData.nm_skpd}</TableCell>
        <TableCell>{allData.nm_sub_kegiatan}</TableCell>

        <TableCell>{allData.kd_rek}</TableCell>

        <TableCell>{allData.nm_rek}</TableCell>
        <TableCell>{allData.anggaran}</TableCell>
        <TableCell>{allData.realasasi}</TableCell>
      </TableRow>

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
    </>
  );
}

UserTableRow.propTypes = {
  index: PropTypes.any,
  id: PropTypes.any,
  allData: PropTypes.any,
};
