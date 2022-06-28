import React, { useMemo } from "react";
import { NextPage } from "next";

import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { useYupValidationResolver, textValidatorGlobal } from "@utils/index";
import { CButton, CInput, CLayout } from "@components/index";

type FormData = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(textValidatorGlobal.emailFormatter)
          .required(textValidatorGlobal.required),
        password: yup.string().required(textValidatorGlobal.required),
      }),
    []
  );

  const onSubmit = async ({ email, password }: FormData) => {
    // const { hasError, message, data } = await loginUser(email,password);
    // if (hasError) {
    //   toastMessage('error', message);
    //   return;
    // }
    // toastMessage('success', message);
    // if (data?.is_talent) {
    //   router.replace('/talent/dashboard');
    // } else {
    //   router.replace('/recruiter/dashboard');
    // }
  };

  const methods = useForm<FormData>({
    mode: "onChange",
    resolver: useYupValidationResolver(validationSchema),
  });

  return (
    <CLayout>
      <div className="flex h-full">
        <div className="w-4/6 ">imagen</div>
        <div className="flex items-center justify-center w-2/6 bg-blue-300">
          <FormProvider {...methods}>
            <form className="w-4/6" onSubmit={methods.handleSubmit(onSubmit)}>
              <CInput
                name="email"
                label={"Ingrese correo: "}
                placeholder={"Escriba aquí"}
              />
              <CInput
                name="password"
                label={"Ingrese contraseña: "}
                placeholder={"Escriba aquí"}
                />
              <CButton 
                label={"Ingresar"}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </CLayout>
  );
};

export default Login;
