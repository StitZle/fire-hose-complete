import React from "react";
import {ListItem, ListItemButton} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "react-router-dom";

const ListItemLink = ( {
                           icon,
                           primaryText,
                           path
                       } ) => {

    const renderLink = React.useMemo( () => React.forwardRef( function Link( itemProps, ref ) {
        return <Link to={path} ref={ref} {...itemProps} role={undefined}/>;
    } ), [path], );

    return (<li>
        <ListItem disablePadding>
            <ListItemButton component={Link} to={path}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primaryText}/>
            </ListItemButton>
        </ListItem>
    </li>);
};

export default ListItemLink;