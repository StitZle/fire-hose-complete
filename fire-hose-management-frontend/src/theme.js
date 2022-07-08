import { createTheme } from "@mui/material/styles";
import { deDE } from "@material-ui/core/locale";

const theme = createTheme(
    {
        palette: {
            primary: { main: "#2B7A78" },
        },
    },
    deDE
);

export default theme;
