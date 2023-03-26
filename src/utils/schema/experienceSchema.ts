import * as yup from "yup";

export const experienceSchema = yup.object().shape({
  companyName: yup
    .string()
    .required("Название компании обязательно")
    .max(40, "Максимум 40 символов"),

  position: yup
    .string()
    .required("Название должности обязательно")
    .max(40, "Максимум 40 символов"),

  department: yup.string().max(40, "Максимум 40 символов"),

  startMonth: yup
    .string()
    .required("Месяц начала работы обязателен")
    .matches(/^(?!-)\D*/, "Месяц начала работы обязателен"),

  startYear: yup
    .string()
    .required("Год начала работы обязателен")
    .matches(/^(?!-)\D*/, "Год начала работы обязателен"),

  obligations: yup
    .string()
    .required("Указание обязанностей обязательно")
    .max(1000, "Максимум 1000 символов"),
});
