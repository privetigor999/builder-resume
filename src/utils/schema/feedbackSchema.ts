import * as yup from "yup";

export const feedBackSchema = yup.object().shape({
  name: yup
    .string()
    .required("Введите имя")
    .max(30, "Максимум 30 символов"),
  email: yup
    .string()
    .email("Введите корректую почту")
    .max(40, "Допускается максимум 40 символов"),

  message: yup
    .string()
    .required("Поле с сообщением обязательно для заполнения")
    .max(300, "Максимум 300 символов"),
});
