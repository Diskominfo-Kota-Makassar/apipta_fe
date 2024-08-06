import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useLocalStorage } from 'src/routes/hooks/useLocalStorage';

import { toast, ToastContainer } from 'react-toastify';

import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  MenuItem,
  DialogActions,
  CircularProgress,
  Grid,
  Select,
  InputLabel,
  FormControl,
  ListItemText,
  Checkbox,
  CardContent,
  OutlinedInput,
} from '@mui/material';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { getUsersFromAPI, getAllFileAuditFromAPI, fileBaseURL } from 'src/utils/api';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

export default function UserTableRow({ index, id, no, tgl, uraian, allData, notify }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [userLocal, setUser] = useLocalStorage('user');

  // const notify = (comment) => toast(comment);

  const [atList, setAtList] = useState([]);
  const [obrikList, setObrikList] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

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

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialogEdit = () => {
    setOpenDialogEdit(true);
  };
  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const handleUsersFromAPI = useCallback(async () => {
    const users = await getUsersFromAPI();
    const usersObject = await users.data;
    usersObject.forEach((user) => {
      if (user.role_id === 5) {
        setObrikList((prevObrikList) => [...prevObrikList, user]);
      }
    });
  }, []);

  const downloadFile = (idF) => {
    const nameFile = valueDraftNaskahFromAPI.find((vf) => vf.penugasan_id === idF.toString())
      ?.files[7];
    window.open(`${fileBaseURL}/file/inspektorat/${nameFile}`, '_blank');
  };

  const getUserNameById = (idU) => {
    const user = obrikList.find((usr) => usr.id === +idU);

    console.log('user', user);

    return user ? user.nama : '';
  };

  const handleAllFileAuditFromAPI = useCallback(async () => {
    const file = await getAllFileAuditFromAPI();
    setValueDraftNaskahFromAPI(file.data);
  }, []);

  useEffect(() => {
    handleAllFileAuditFromAPI();
  }, [handleAllFileAuditFromAPI]);

  useEffect(() => {
    handleUsersFromAPI();
  }, [handleUsersFromAPI]);

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell />

        <TableCell>{index}</TableCell>
        <TableCell>{no}</TableCell>
        <TableCell>{uraian}</TableCell>
        <TableCell> {getUserNameById(allData.obrik_id)} </TableCell>

        <TableCell align="right">
          <IconButton onClick={() => downloadFile(allData.id)}>
            <Iconify icon="material-symbols:download" />
          </IconButton>
        </TableCell>
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
  no: PropTypes.any,
  id: PropTypes.any,
  tgl: PropTypes.any,
  uraian: PropTypes.any,
  allData: PropTypes.any,
  notify: PropTypes.any,
};
