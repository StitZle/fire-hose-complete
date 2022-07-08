import { Drawer, ListItemButton } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { primaryRoutes, secondaryRoutes } from "../../router/navigationPaths";
import { Link } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import NavigationAppBar from "./NavigationAppBar";

const drawerWidth = 240;

const DefaultPage = ({ children }) => {
    const { isAuthenticated } = useAuth0();

    const primaryItems = primaryRoutes.map((route, index) => (
        <ListItemButton key={index} component={Link} to={route.path}>
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.name} />
        </ListItemButton>
    ));

    const secondaryItems = secondaryRoutes.map((route, index) => (
        <ListItemButton key={index} component={Link} to={route.path}>
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.name} />
        </ListItemButton>
    ));

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>{primaryItems}</List>
            <Divider />
            <List>{secondaryItems}</List>
        </div>
    );

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <NavigationAppBar />
                <Box
                    component="nav"
                    sx={{
                        width: { sm: drawerWidth },
                        flexShrink: { sm: 0 },
                    }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    {/*Mobile drawer*/}

                    {isAuthenticated && (
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "block",
                                },
                                "& .MuiDrawer-paper": {
                                    boxSizing: "border-box",
                                    width: drawerWidth,
                                    backgroundColor: "transparent",
                                },
                            }}
                            open
                        >
                            {drawer}
                        </Drawer>
                    )}
                </Box>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </>
    );
};
export default DefaultPage;
