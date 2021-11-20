import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { InputLabel, MenuItem, Select } from "@mui/material";
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
  width?: string;
  options: { label: string; value: string | number }[];
}

export const SelectInput: React.FC<IProps> = ({
  label = "xsxs",
  name,
  // loading = false,
  width = "100%",
  options,
  disabled = false,
  // ...rest
}) => {
  const { control, errors } = useFormContext();

  return (
    <Styled.Row>
      <Controller
        name={name}
        defaultValue={0}
        control={control}
        render={({ onChange, value }) => (
          <>
            <InputLabel id={`label-${name}`}>{label}</InputLabel>
            <Select
              id={`label-${name}`}
              labelId={`label-${name}`}
              value={value === 99 ? "" : value}
              disabled={disabled}
              onChange={onChange}
              variant="outlined"
              style={{ color: "black" }}
            >
              {options.map((val, ix) => (
                <MenuItem key={ix} value={val.value}>
                  {val.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      />
      {errors[name] ? (
        <ErrorText style={{ width: width }}>{errors[name].message}</ErrorText>
      ) : (
        <MarginBottom />
      )}

      {/* {errors['input']} */}
      {/* </div> */}
    </Styled.Row>
  );
};
