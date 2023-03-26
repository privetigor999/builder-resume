import * as yup from "yup";

export const baseSchema = yup.object().shape({
  position: yup
    .string()
    .required("Ожидаемая должность обязательна к заполнению")
    .max(40, "Максимум 40 символов"),

  middlename: yup.string().max(30, "Максимум 30 символов"),

  name: yup
    .string()
    .required("Имя обязательно к заполнению")
    .matches(/^([^0-9]*)$/, "Имя не должно не должно содержать цифры")
    .max(25, "Допускается максимум 25 символов"),

  surname: yup
    .string()
    .required("Фамилия обязательна к заполнению")
    .matches(/^([^0-9]*)$/, "Фамилия не должна содержать цифры")
    .max(25, "Допускается максимум 25 символов"),

  dateBirthday: yup.string().required("Дата рождения обязательна к заполнению"),

  phone: yup
    .string()
    .required("Номер телефона обязателен к заполнению")
    .min(7, "Телефон должен содержать минимум 7 цифр")
    .max(18, "Допускается максимум 18 символов")
    .matches(/^([^a-zA-Zа-яА-Я]*)$/, "Телефон не должен содержать букв"),

  email: yup
    .string()
    .required("Почта обязательна к заполнению")
    .email("Введите корректую почту")
    .max(40, "Допускается максимум 40 символов"),

  telegram: yup.string().max(40, "Допускается максимум 40 символов"),
});
