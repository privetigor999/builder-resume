import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  signUpEmail: yup
    .string()
    .required("Логин обязателен")
    .email("Введите корректный email")
    .max(30, "Максимум 30 символов"),
  signUpPassword: yup
    .string()
    .required("Пароль обязателен")
    .min(6, "Минимум 6 символов")
    .max(30, "Максимум 30 символов"),
});
