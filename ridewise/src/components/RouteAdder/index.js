import React from 'react';
import Typography from '@mui/material/Typography';
import Form from './Form';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../LoginButton';

function RouteAdder() {
  const userData = useRecoilValue(userDataAtom);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Typography variant="h5">Add your route</Typography>

      {userData ? (
        <Form />
      ) : (
        <Typography>You need to login in order to add route</Typography>
      )}
    </div>
  );
}

export default RouteAdder;
