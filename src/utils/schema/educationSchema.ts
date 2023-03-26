import * as yup from "yup";

export const educationSchema = yup.object().shape({
  university: yup
    .string()
    .required("Название университета обязателено")
    .max(100, "Допускается максимум 100 символов"),

  startedLearn: yup
    .string()
    .required("Год начала обучения обязателен")
    .matches(/^(?!-)\D*/, "Год начала обучения обязателен"),

  faculty: yup
    .string()
    .required("Факультет обязателен")
    .max(40, "Допускается максимум 40 символов"),

  specialization: yup.string().max(40, "Допускается максимум 40 символов"),
});
