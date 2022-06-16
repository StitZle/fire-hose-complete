import { SelectValidator } from "react-material-ui-form-validator";
import React from "react";
import hash from "hash-it";

export const CSelect = ({
  hasAutofocus = false,
  margin = "normal",
  label,
  fullWith = true,
  variant = "filled",
  defaultValue = "",
  options = [],
  ...other
}) => {
  return (
    <SelectValidator
      autoFocus={hasAutofocus}
      margin={margin}
      id={hash(label).toString()}
      label={label}
      fullWidth={fullWith}
      variant={variant}
      defaultValue={defaultValue}
      {...other}
    >
      {options}
    </SelectValidator>
  );
};
