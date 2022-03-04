import React from 'react';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    hrText: {
        lineHeight: "1.5em",
        position: "relative",
        border: 0,
        color: "black",
        textAlign: "center",
        marginTop: "10px",
        marginBottom: "10px",
        maxWidth: "95%",
        '&::before': {
            content: "''",
            background: "#9A9A9A",
            position: "absolute",
            left: 0,
            top: "50%",
            width: "100%",
            height: "1px"
        },
        '&::after': {
            content: "attr(data-content)",
            position: "relative",
            display: "inline-block",
            padding: "0.5em",
            lineHeight: "1.5em",
            backgroundColor: "#ffffff"
        }
    },
}));

export const CLine = ({title}) => {
    const classes = useStyles();
    return (
        <hr className={classes.hrText} data-content={title}/>
    );
}