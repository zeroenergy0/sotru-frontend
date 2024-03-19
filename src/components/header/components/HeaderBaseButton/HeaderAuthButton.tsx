import React, { useState, useEffect, SyntheticEvent, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import StartIcons from '../../../../assets/images/images/get-started.svg';
import { readUser } from '../../../../services/localStorage.service';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useReduxHooks';
import { setUser } from '../../../../store/slices/userSlice';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';
import EmailOutline from 'mdi-material-ui/EmailOutline';
import LogoutVariant from '@mui/icons-material/PowerSettingsNewOutlined';
import AccountOutline from 'mdi-material-ui/AccountOutline';
import MessageOutline from 'mdi-material-ui/MessageOutline';

type HeaderAuthButtonData = React.ButtonHTMLAttributes<HTMLButtonElement>;

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const username = readUser()?.username;
    if (username) {
      loadUser(username);
    }
  }, []);

  const loadUser = async (user: string) => {
    await dispatch(setUser(user));
  };

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      navigate(url);
    }
    setAnchorEl(null);
  };

  const BadgeContentSpan = user
    ? styled('span')(() => ({
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: '#44b700',
        boxShadow: `0 0 0 2px #2b2c40`,
      }))
    : styled('span')(() => ({
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: '#8592A3',
        boxShadow: `0 0 0 2px #2b2c40`,
      }));

  const styles = {
    py: 1,
    px: 3,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: '#e7e3fc',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: '#e7e3fc',
    },
  };

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Avatar alt='Avatar-text' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }}>
          {user?.charAt(0)}
        </Avatar>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{
          '& .MuiMenu-paper': { width: 230, marginTop: 2 },
          '& .MuiMenu-list': { backgroundColor: '#2b2c40', borderRadius: 0 },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge overlap='circular' badgeContent={<BadgeContentSpan />} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <Avatar alt='Avatar-text' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }}>
                {user?.charAt(0)}
              </Avatar>
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600, color: '#e7e3fc' }}>{user}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: '#e7e3fc' }}>
                Admin
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 1 }} />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 1 }} />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <MessageOutline sx={{ marginRight: 1 }} />
            Chat
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 1 }} />
            Settings
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 1 }} />
            Pricing
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/logout')}>
          <Box sx={styles}>
            <LogoutVariant sx={{ marginRight: 1 }} />
            Logout
          </Box>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export const HeaderAuthButton: React.FC<Partial<HeaderAuthButtonData>> = ({ onClick }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const username = readUser()?.username;
    if (username) {
      loadUser(username);
    }
  }, []);

  const loadUser = async (user: string) => {
    await dispatch(setUser(user));
  };

  return user === null ? (
    <Button
      radius='full'
      variant='flat'
      color='success'
      className='mx-auto flex max-w-xl items-center justify-center gap-2 rounded-full px-4 py-2 text-center text-sm text-light md:px-4 md:py-2 md:text-xl'
      endContent={<img src={StartIcons} alt='start-icon' className='mt-2 h-4 w-4 md:h-6 md:w-6' />}
      onClick={onClick}>
      Get Started
    </Button>
  ) : (
    <UserDropdown />
  );
};
