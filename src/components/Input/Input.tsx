import { MenuItem, TextField } from "@mui/material";

import React from "react";

interface ITextFieldProps {
  id: string;
  label: string;
  helperText?: any;
  type?: "text" | "date" | "number";
  defaultValue?: string;
  required?: boolean;
  select?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: any;
  value?: any;
  setValue?: any;
  options?: any;
  width?: any;
  multiline?: boolean;
  minRows?: number;
}

export const Input: React.FC<ITextFieldProps> = React.forwardRef(
  (props, ref) => {
    const [status, setStatus] = React.useState("text");

    const onFocusHandler = () => {
      if (props.type === "date") {
        setStatus(props.type);
      }
    };

    const onBlurHandler = () => {
      if (props.type === "date") {
        setStatus("text");
      }
    };

    return (
      <TextField
        inputRef={ref}
        {...props}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        type={props.type === "date" ? status : props.type}
        sx={{
          position: "relative",
          width: `${props?.width ? props.width : "60%"}`,
          marginBottom: "20px",
          "&:last-child": {
            marginBottom: "0px",
          },
          "& .MuiFormLabel-asterisk": {
            color: "red",
          },
          "& input[type=number]::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "& input[type=number]::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "@media (min-width: 786px)": {
            width: "700px",
          },
        }}
      >
        {props.options?.map((option: string) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    );
  }
);
