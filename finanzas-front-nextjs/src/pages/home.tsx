import React, { useMemo } from "react";
import { NextPage } from "next";
import { CButton, CInput, CLayout, CSelect } from "@components/index";
import { FormProvider, useForm } from "react-hook-form";
import { textValidatorGlobal } from "@utils/messages";

import * as yup from "yup";
import { useYupValidationResolver } from "@utils/yupValidation";
import { finanzaApi } from "src/api/api";
import { useState } from "react";

type FormData = {
  VNominal: number;
  VComercial: number;
  NA: number;
  Fcupon: number;
  DXA: number;
  TDeTasanumber: number;
  Capit: number;
  TI: number;
  TAD: number;
  IR: number;
  FEmision: number;
  inv: number;
};

const Home: NextPage = () => {
  const [calculate, setCalculate] = useState();

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        VNominal: yup
          .number()
          .typeError(textValidatorGlobal.required)
          .required(textValidatorGlobal.required),
        VComercial: yup
          .number()
          .typeError(textValidatorGlobal.required)
          .required(textValidatorGlobal.required),
        NA: yup
          .number()
          .typeError(textValidatorGlobal.required)
          .required(textValidatorGlobal.required),
        Fcupon: yup.string().required(textValidatorGlobal.required),
        DXA: yup
          .number()
          .typeError(textValidatorGlobal.required)
          .required(textValidatorGlobal.required),
        TDeTasa: yup.string().required(textValidatorGlobal.required),
        Capit: yup.string().required(textValidatorGlobal.required),
        TI: yup
          .number()
          .typeError(textValidatorGlobal.required)
          .required(textValidatorGlobal.required),
        TAD: yup
          .number()
          .typeError(textValidatorGlobal.required)
          .required(textValidatorGlobal.required),
        IR: yup
          .number()
          .typeError(textValidatorGlobal.required)
          .required(textValidatorGlobal.required),
        FEmision: yup.string().required(textValidatorGlobal.required),
        inv: yup
          .number()
          .typeError(textValidatorGlobal.required)
          .required(textValidatorGlobal.required),
      }),
    []
  );

  const onSubmit = async (data: FormData) => {
    // console.log({data});
    const resp = await finanzaApi.post("/bonos", data);
    console.log({ resp });
  };

  const methods = useForm<FormData>({
    mode: "onChange",
    resolver: useYupValidationResolver(validationSchema),
  });

  return (
    <CLayout>
      <FormProvider {...methods}>
        <form className="" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex justify-end px-7">
            <CSelect
              name="moneda"
              label={"Moneda "}
              placeholder={"Escriba aquí"}
              options={[
                {
                  id: "S/",
                  name: "Soles",
                },
                {
                  id: "$/",
                  name: "Dolares",
                },
              ]}
              valueName={"name"}
            />
          </div>
          <div className="flex">
            <div className="w-2/4 px-7">
              <CInput
                name="VNominal"
                label={"Valor Nominal "}
                placeholder={"Escriba aquí"}
                type="number"
                step="any"
              />
              <CInput
                name="VComercial"
                label={"Valor Comercial "}
                placeholder={"Escriba aquí"}
                type="number"
                step="any"
              />
              <CInput
                name="NA"
                label={"Número de años "}
                placeholder={"Escriba aquí"}
                type="number"
                step="any"
              />
              <CSelect
                name="Fcupon"
                label={"Frecuencia del cupon "}
                placeholder={"Escriba aquí"}
                options={[
                  {
                    id: "m",
                    name: "Mensual",
                  },
                  {
                    id: "b",
                    name: "Bimestral",
                  },
                  {
                    id: "t",
                    name: "Trimestral",
                  },
                  {
                    id: "c",
                    name: "Cuatrimestral",
                  },
                  {
                    id: "s",
                    name: "Semestral",
                  },
                  {
                    id: "a",
                    name: "Anual",
                  },
                ]}
                valueName={"name"}
              />
              <CSelect
                name="DXA"
                label={"Días por año"}
                placeholder={"Escriba aquí"}
                options={[
                  {
                    id: 360,
                    name: 360,
                  },
                  {
                    id: 365,
                    name: 365,
                  },
                ]}
                valueName={"name"}
              />
              <CSelect
                name="TDeTasa"
                label={"Tipo de tasa de Interés"}
                placeholder={"Escriba aquí"}
                options={[
                  {
                    id: "e",
                    name: "Efectiva",
                  },
                  {
                    id: "n",
                    name: "Nominal",
                  },
                ]}
                valueName={"name"}
              />
            </div>
            <div className="w-2/4 px-7">
              <CSelect
                name="Capit"
                label={"Capitalización"}
                placeholder={"Escriba aquí"}
                options={[
                  {
                    id: "d",
                    name: "Diaria",
                  },
                  {
                    id: "q",
                    name: "Quincenal",
                  },
                  {
                    id: "m",
                    name: "Mensual",
                  },
                  {
                    id: "b",
                    name: "Bimestral",
                  },
                  {
                    id: "t",
                    name: "Trimestral",
                  },
                  {
                    id: "c",
                    name: "Cuatrimestral",
                  },
                  {
                    id: "s",
                    name: "Semestral",
                  },
                  {
                    id: "a",
                    name: "Anual",
                  },
                ]}
                valueName={"name"}
              />
              <CInput
                name="TI"
                label={"Tasa de interés"}
                placeholder={"Escriba aquí"}
                type="number"
                step="any"
              />
              <CInput
                name="TAD"
                label={"Tasa anual de descuento"}
                placeholder={"Escriba aquí"}
                type="number"
                step="any"
              />
              <CInput
                name="IR"
                label={"Importe a la renta"}
                placeholder={"Escriba aquí"}
                type="number"
                step="any"
              />
              <CInput
                name="FEmision"
                label={"Fecha de emisión"}
                placeholder={"Escriba aquí"}
                type="number"
                step="any"
              />
              <CInput
                name="inv"
                label={"Inversión"}
                placeholder={"Escriba aquí"}
                type="number"
                step="any"
              />
              <CButton label={"Calcular"} />
            </div>
          </div>
        </form>

        <div className="px-4">
          <table className="table border-2 table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Precio Actual</th>
                <th scope="col">Utilidad/Pérdida</th>
                <th scope="col">Duración</th>
                <th scope="col">Convexidad</th>
                <th scope="col">Total</th>
                <th scope="col">Duración modificada</th>
                <th scope="col">VAN</th>
                <th scope="col">TIR</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </FormProvider>
    </CLayout>
  );
};

export default Home;
