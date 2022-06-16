import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBarAuth from "./AppBarAuth";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AppBar } from "@mui/material";
import React from "react";

const NavigationAppBar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Schlauchverwaltung {/* TODO add from global config here */}
        </Typography>
        <AppBarAuth />
        <IconButton color="inherit">
          <DarkModeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationAppBar;
