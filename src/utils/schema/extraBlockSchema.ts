import * as yup from "yup";

export const extraBlockSchema = yup.object().shape({
  information: yup
    .string()
    .required("Дополнительная информация обязательна")
    .max(6000, "Максимум 600 символов"),
});
