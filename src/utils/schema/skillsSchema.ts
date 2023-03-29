import * as yup from "yup";

export const skillsSchema = yup.object().shape({
  skill1: yup
    .string()
    .required("Это поле обязательно")
    .max(20, "Максимум 20 символов"),

  skill2: yup
    .string()
    .required("Это поле обязательно")
    .max(20, "Максимум 20 символов"),

  skill3: yup.string().max(20, "Максимум 20 символов"),

  skill4: yup.string().max(20, "Максимум 20 символов"),

  skill5: yup.string().max(20, "Максимум 20 символов"),
});
