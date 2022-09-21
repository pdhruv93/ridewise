import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
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
  const [, setToastData] = useRecoilState(toastAtom);

  const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    useTLS: true,
  });

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
        return (
          <Tooltip title={value.row.creatorDetails[0].name}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src={value.row.creatorDetails[0].profilePic}
            />
          </Tooltip>
        );
      },
      valueGetter: value => value.row.creatorDetails[0].name,
    },
    {
      field: 'manage',
      headerName: 'Connect',
      width: 100,
      renderCell: value => {
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
              href={`mailto:${value.row.creatorDetails[0].email}`}
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

    // Realtime Data changes
    const channel = pusher.subscribe(process.env.REACT_APP_PUSHER_CHANNEL);
    channel.bind('changed', () => {
      console.log('Pusher event recieved...');
      axios
        .get(
          `${process.env.REACT_APP_MONGO_DB_BASE_URL}/getAllRoutes?secret=${process.env.REACT_APP_REALM_SECRET}`
        )
        .then(routes => setRoutesList(routes.data));
    });
  }, []);

  return routesList ? (
    <div style={{ height: 400, width: '100%' }}>
      <Typography variant="h5">Search for drivers</Typography>
      <DataGrid
        getRowId={row => row._id}
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
