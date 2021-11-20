import React from "react";
import styled from "styled-components";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import type { ObjectSchema } from "yup";

interface IProps {
  // validateMode?: Mode;
  schema?: ObjectSchema;
  values?: Record<string, unknown>;
  isStandalone?: boolean;
  initialValues?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: Record<string, any>) => void;
}

const StyledForm = styled.form<{ isStandalone: boolean }>`
  ${(props) =>
    props.isStandalone
      ? `
          padding: 0 2rem;
        `
      : null}
`;

export const Form: React.FC<IProps> = ({
  isStandalone = false,
  initialValues,
  values,
  schema,
  children,
  onSubmit,
}) => {
  const methods = useForm({
    defaultValues: initialValues,
    resolver: schema ? yupResolver(schema) : undefined,
    mode: "onSubmit",
  });

  const { reset, handleSubmit } = methods;

  React.useEffect(() => {
    reset(values);
  }, [values, reset]);

  return (
    <FormProvider {...methods}>
      <StyledForm
        isStandalone={isStandalone}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {children}
      </StyledForm>
    </FormProvider>
  );
};
