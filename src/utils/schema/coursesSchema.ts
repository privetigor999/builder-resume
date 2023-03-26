import * as yup from "yup";

export const coursesSchema = yup.object().shape({
  coursesCompany: yup
    .string()
    .required("Название учреждения обязательно")
    .max(40, "Максимум 40 символов"),

  coursesName: yup
    .string()
    .required("Название курсов обязательно")
    .max(40, "Максимум 40 символов"),
});
