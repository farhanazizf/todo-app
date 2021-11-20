import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { InputLabel, TextField } from "@mui/material";
import Styled, { MarginBottom, ErrorText } from "./style";

interface IProps {
  name: string;
  label: string;
  loading?: boolean;
  placeholder?: string;
  min?: string;
  max?: string;
  minlength?: number;
  maxlength?: number;
  disabled?: boolean;
  hasLine?: boolean;
  type?: "text" | "email" | "tel" | "number" | "password";
  width?: string;
}

export const Input: React.FC<IProps> = ({
  label,
  name,
  type = "text",
  loading = false,
  width = "100%",
  disabled = false,
  // ...rest
}) => {
  const { control, errors } = useFormContext();

  return (
    <Styled.Row>
      <Controller
        name={name}
        defaultValue=""
        control={control}
        render={({ onChange, value }) => (
          <>
            <InputLabel id={`label-${name}`}>{label}</InputLabel>
            <TextField
              // id="outlined-basic"
              // label={label}
              variant="outlined"
              onChange={onChange}
              value={value}
            />
          </>
        )}
      />
      {errors[name] ? (
        <ErrorText style={{ width: width }}>{errors[name].message}</ErrorText>
      ) : (
        <MarginBottom />
      )}
    </Styled.Row>
  );
};
