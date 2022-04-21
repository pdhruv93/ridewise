import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userDataAtom } from '../LoginButton';
import { toastAtom } from '../ToastNotification';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';

export default function SearchRoutes() {
  const currUser = useRecoilValue(userDataAtom);
  const [routesList, setRoutesList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [, setToastData] = useRecoilState(toastAtom);

  function deleteRoute(routeId) {
    console.log(`Deleting routeId: ${routeId}`);
    axios
      .delete(
        `${process.env.REACT_APP_MONGO_DB_BASE_URL}/deleteRoute?secret=${process.env.REACT_APP_REALM_SECRET}&routeId=${routeId}`
      )
      .then(() => {
        console.log('Route deleted DB side!!');
        setToastData({ message: 'Route Deleted!!', isOpen: true });
      });
  }

  const columns = [
    {
      field: 'startPoint',
      headerName: 'Start Point',
      width: 150,
    },
    {
      field: 'endPoint',
      headerName: 'End Point',
      width: 150,
    },
    {
      field: 'maxSharingAllowed',
      headerName: 'Max P',
      description:
        'The driver has chosen to share ride with these many persons',
      width: 100,
      type: 'number',
      valueFormatter: ({ value }) => Number(value.$numberInt),
      sortComparator: (v1, v2) => Number(v1.$numberInt) - Number(v2.$numberInt),
    },
    {
      field: 'zipCodes',
      headerName: 'Zip Codes',
      description: 'Zip Codes which might fall into the route',
      width: 200,
      renderCell: value => {
        let zipCodes = value.row.zipCodes;
        return (
          <Stack direction="row" spacing={1}>
            {zipCodes.map(code => (
              <Chip key={code} label={code} size="small" />
            ))}
          </Stack>
        );
      },
    },
    {
      field: 'creator',
      headerName: 'Driver',
      width: 100,
      renderCell: value => {
        let user = usersList.filter(u => u.userId === value.row.creator);
        return (
          <Tooltip title={user[0] ? user[0].name : ''}>
            <Avatar sx={{ width: 30, height: 30 }} src={user[0]?.profilePic} />
          </Tooltip>
        );
      },
      valueGetter: params => {
        let user = usersList.filter(u => u.userId === params.row.creator);
        return user[0] ? user[0].name : '';
      },
    },
    {
      field: 'manage',
      headerName: 'Connect',
      width: 100,
      renderCell: value => {
        let user = usersList.filter(u => u.userId === value.row.creator);

        return (
          currUser &&
          (value.row.creator === currUser.googleId ? (
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() => deleteRoute(value.id)}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="mail"
              color="primary"
              href={`mailto:${user[0].email}`}
            >
              <MailIcon />
            </IconButton>
          ))
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_MONGO_DB_BASE_URL}/getAllRoutes?secret=${process.env.REACT_APP_REALM_SECRET}`
      )
      .then(routes => setRoutesList(routes.data));
  }, []);

  useEffect(() => {
    let creators = [];
    routesList.forEach(route => creators.push(route.creator));

    axios
      .get(
        `${process.env.REACT_APP_MONGO_DB_BASE_URL}/getUsers?secret=${
          process.env.REACT_APP_REALM_SECRET
        }&userIds=${creators.join(',')}`
      )
      .then(users => setUsersList(users.data));
  }, [routesList]);

  return routesList ? (
    <div style={{ height: 400, width: '100%' }}>
      <Typography variant="h5">Search for drivers</Typography>
      <DataGrid
        getRowId={row => row._id.$oid}
        rows={routesList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  ) : (
    <h2>Loading routes list...</h2>
  );
}
