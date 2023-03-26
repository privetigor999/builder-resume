import * as yup from "yup";

export const languagesSchema = yup.object().shape({
  language1: yup
    .string()
    .required("Выбор языка обязателен")
    .max(30, "Максимум 30 символов"),
  language2: yup
    .string()
    .required("Выбор языка обязателен")
    .max(30, "Максимум 30 символов"),
});
