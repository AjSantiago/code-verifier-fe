import React, { useState } from 'react';

//* Theme personalization of Material UI
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
//* Css & Drawer
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';

//* Nav Bar
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//* Material Lists
import List from '@mui/material/List';
//*  Icons
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
//* Material Grids & Box
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

//* List for the Menu
import { MenuItems } from './MenuItems';

//* Width for Drawer Menu
const drawerWidth: number = 240;

//* Props for AppBar
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

//* TODO: AppBar Component
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//* TODO: DrawerMenu
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      //* Breakpoint to Media Queries of CSS in different display sizes
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

//* Define Theme
const myTheme = createTheme();

//* Dashboard content
//* TODO: Refactor with navigation components
export const Dashboard = () => {
  const [open, setOpen] = useState(true);

  //* Show / Hide Drawer Menu
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={myTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* AppBar */}
        <AppBar position='absolute' open={open}>
          {/* Toolbar - Actions */}
          <Toolbar sx={{ pr: '24px' }}>
            {/* Icon to toggle Drawer Menu */}
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            {/* Title of App */}
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Code Verification Katas
            </Typography>
            {/* Icon to Show Notifications */}
            <IconButton color='inherit'>
              <Badge badgeContent={10} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {/* Icon to Logout */}
            <IconButton color='inherit'>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            {/* Icon to Hide the Menu */}
            <IconButton color='inherit' onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {/* List of Menu Items */}
          <List component='nav'>{MenuItems}</List>
        </Drawer>
        {/* Dashboard Content */}
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          {/* Toolbar */}
          <Toolbar />
          {/* Container with the Content */}
          {/* TODO: Change for the Navigation Content by URL and Stack of Routes */}
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              ></Paper>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
