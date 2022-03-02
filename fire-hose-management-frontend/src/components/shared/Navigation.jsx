import React, { useState } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {primaryRoutes, secondaryRoutes } from "../../router/navigationPaths";
import { AppBar, Drawer, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import { AppRouter } from "../../router/AppRouter";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuth0 } from "@auth0/auth0-react";
import AppBarAuth from "./AppBarAuth";


const drawerWidth = 240;

const Navigation = () => {

  const { isAuthenticated } = useAuth0();


  const primaryItems = primaryRoutes.map( ( route, index ) =>
    <ListItemButton key={index} component={Link} to={route.path}>
      <ListItemIcon>
        {route.icon}
      </ListItemIcon>
      <ListItemText primary={route.name}/>
    </ListItemButton>
  );

  const secondaryItems = secondaryRoutes.map( ( route, index ) =>
    <ListItemButton key={index} component={Link} to={route.path}>
      <ListItemIcon>
        {route.icon}
      </ListItemIcon>
      <ListItemText primary={route.name}/>
    </ListItemButton>
  );


  const drawer = (
    <div>
      <Toolbar/>
      <Divider/>
      <List>
        {primaryItems}
      </List>
      <Divider/>
      <List>
        {secondaryItems}
      </List>
    </div>);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: ( theme ) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Schlauchverwaltung {/* TODO add from global config here */}
          </Typography>
          <AppBarAuth/>
          <IconButton color="inherit">
            <DarkModeIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>



      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/*Mobile drawer*/}

        {isAuthenticated &&
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "transparent" },

              }}
              open>
              {drawer}
            </Drawer>
        }
      </Box>



      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar/>
        <AppRouter/>
      </Box>
    </Box>
  );
}

export default Navigation;