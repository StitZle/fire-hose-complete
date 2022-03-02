import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from "@mui/material/Typography";

const { useAuth0 } = require( "@auth0/auth0-react" );
const { Button } = require( "@mui/material" );
const React = require( "react" );


const AppBarAuth = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();


  if( !isAuthenticated ) {
    return (<Button color="inherit" onClick={() => loginWithRedirect()}>Login</Button>);
  }

  return (
    <>
      <AccountCircleIcon/>
      <Typography variant="body2" noWrap component="div">
        {user.name}
      </Typography>
      <Button color="inherit" onClick={() => logout( { returnTo: window.location.origin } )}>Logout</Button>
    </>
  );

}

export default AppBarAuth;