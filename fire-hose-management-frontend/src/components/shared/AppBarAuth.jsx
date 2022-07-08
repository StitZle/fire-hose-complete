import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";

const { useAuth0 } = require("@auth0/auth0-react");
const { Button } = require("@mui/material");
const React = require("react");

const useStyles = makeStyles((theme) => ({
    avatar: {
        marginRight: 10,
    },
}));

const AppBarAuth = () => {
    const classes = useStyles();
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return (
            <Button color="inherit" onClick={() => loginWithRedirect()}>
                Login
            </Button>
        );
    }

    return (
        <>
            <div className={classes.avatar}>
                <AccountCircleIcon />
            </div>
            <Typography variant="body2" noWrap component="div">
                {user.name}
            </Typography>
            <Button color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
            </Button>
        </>
    );
};

export default AppBarAuth;
