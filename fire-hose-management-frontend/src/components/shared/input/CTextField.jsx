import { TextValidator } from "react-material-ui-form-validator";
import React from "react";
import hash from "hash-it";

export const CTextField = ({
    hasAutofocus = false,
    margin = "normal",
    label,
    type = "text",
    fullWith = true,
    variant = "filled",
    ...other
}) => {
    return (
        <TextValidator
            autoFocus={hasAutofocus}
            margin={margin}
            id={hash(label).toString()}
            label={label}
            type={type}
            fullWidth={fullWith}
            variant={variant}
            {...other}
        />
    );
};
