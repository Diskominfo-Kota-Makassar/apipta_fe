import { useState } from 'react';
import { useRouter } from 'src/routes/hooks/use-router';
import { useTheme } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { CircularProgress } from '@mui/material';

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

  const formatToIndonesian = (amount) =>
    new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

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
        <TableCell>{formatToIndonesian(allData.anggaran)}</TableCell>
        <TableCell>{formatToIndonesian(allData.realasasi)}</TableCell>
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
