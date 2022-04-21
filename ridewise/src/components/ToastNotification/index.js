import * as React from 'react';
import { atom, useRecoilState } from 'recoil';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const toastAtom = atom({
  key: 'toastAtom',
  default: { message: null, isOpen: false },
});

export default function SimpleSnackbar() {
  const [toastState, setToastState] = useRecoilState(toastAtom);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastState({ data: null, isOpen: false });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={toastState.isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={toastState.message}
        action={action}
      />
    </div>
  );
}
