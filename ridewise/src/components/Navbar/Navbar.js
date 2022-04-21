import React from 'react';
import Box from '@mui/material/Box';
import { useRecoilState } from 'recoil';
import LoginButton, { userDataAtom } from '../LoginButton';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsList from '../NotificationsList';
import Tooltip from '@mui/material/Tooltip';
import WarningIcon from '@mui/icons-material/Warning';
import '../../styles/styles.css';

export default function Navbar() {
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 1,
        m: 1,
        borderRadius: 1,
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          ridewise
        </Typography>
      </Box>

      <Box sx={{ display: 'flex' }}>
        {userData ? (
          <>
            <Menu
              id="user-profile"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => setUserData(null)}>Logout</MenuItem>
            </Menu>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="user-profile"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                sx={{ width: 35, height: 35 }}
                alt={userData?.name}
                src={userData?.imageUrl}
              />
            </IconButton>
          </>
        ) : (
          <LoginButton />
        )}

        <NotificationsList />

        <Tooltip title="For your safety and tracking always book rides from ridewise. Avoid direct chats.">
          <IconButton>
            <WarningIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
