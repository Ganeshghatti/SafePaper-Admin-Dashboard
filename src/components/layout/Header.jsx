import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header({ onSidebarToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleClose();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#fff',
        boxShadow: 'none',
        borderBottom: '1px solid #dedcff'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', height: 70 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              onClick={onSidebarToggle}
              sx={{ 
                mr: 2,
                color: '#2f27ce',
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            sx={{ 
              color: '#666',
              backgroundColor: '#f8f8ff',
              '&:hover': { backgroundColor: '#dedcff' }
            }}
          >
            <NotificationsIcon />
          </IconButton>

          <IconButton
            onClick={handleMenu}
            sx={{ 
              p: 0.5,
              border: '1px solid #dedcff',
              borderRadius: '8px'
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: '#dedcff',
                color: '#2f27ce',
                width: 32,
                height: 32,
                fontSize: '0.9rem',
                fontFamily: 'Space Grotesk'
              }}
            >
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: '12px',
                border: '1px solid #dedcff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              }
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontFamily: 'Space Grotesk',
                  fontWeight: 600,
                  color: '#2f27ce'
                }}
              >
                {user?.email}
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  fontFamily: 'Poppins',
                  color: '#666',
                  fontSize: '0.75rem'
                }}
              >
                Administrator
              </Typography>
            </Box>
            <Divider sx={{ borderColor: '#dedcff' }} />
            <MenuItem 
              onClick={handleClose}
              sx={{ 
                py: 1.5,
                px: 2,
                fontFamily: 'Poppins',
                gap: 1.5
              }}
            >
              <PersonIcon sx={{ color: '#2f27ce' }} />
              Profile
            </MenuItem>
            <MenuItem 
              onClick={handleClose}
              sx={{ 
                py: 1.5,
                px: 2,
                fontFamily: 'Poppins',
                gap: 1.5
              }}
            >
              <SettingsIcon sx={{ color: '#2f27ce' }} />
              Settings
            </MenuItem>
            <Divider sx={{ borderColor: '#dedcff' }} />
            <MenuItem 
              onClick={handleLogout}
              sx={{ 
                py: 1.5,
                px: 2,
                fontFamily: 'Poppins',
                color: '#ff4444',
                gap: 1.5
              }}
            >
              <LogoutIcon />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 