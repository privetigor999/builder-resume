import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/Form/Form";
import { SaveButton } from "../../../components/SaveButton/SaveButton";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { setUser } from "../../../store/userSlice/userReducer";
import { signUpSchema } from "../../../utils/schema/signUpSchema";
import { TextField } from "@mui/material";

const inputStyles = {
  width: "100%",
  marginBottom: "20px",
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
};

export const SignUp: React.FC = () => {
  const [isFulfilled, setIsFulfilled] = React.useState(false);
  const [errorMes, setErrorMes] = React.useState("Ошибка!");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = () => {
    setErrorMes("");
    setIsFulfilled(true);
    const auth = getAuth();

    createUserWithEmailAndPassword(
      auth,
      getValues().signUpEmail,
      getValues().signUpPassword
    )
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );

        navigate("/resume");
      })
      .catch((error) => {
        setIsFulfilled(false);
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMes("Данный пользователь уже существует");
            break;
          case "auth/invalid-email":
            setErrorMes("Неправильно введен адрес почты");
            break;
          case "auth/operation-not-allowed":
            setErrorMes("Произошла ошибка. Попробуйте заного");
            break;
          default:
            setErrorMes("Произошла ошибка. Попробуйте заного");
            break;
        }
      });
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("signUpEmail")}
          id="signUpEmail"
          label="Почта"
          sx={inputStyles}
          error={!!errors?.signUpEmail}
          helperText={errors?.signUpEmail?.message as string}
          required
        />
        <TextField
          {...register("signUpPassword")}
          sx={inputStyles}
          id="signUpPassword"
          label="Пароль"
          error={!!errors?.signUpPassword}
          helperText={errors?.signUpPassword?.message as string}
          type="password"
          required
        />

        <SaveButton
          title={"Вы успешно зарегистрировались!"}
          errorMes={errorMes}
          isFulfilled={isFulfilled}
          color={"primary"}
          withIcon={false}
          width="100%"
        >
          Зарегистрироваться
        </SaveButton>
      </Form>
    </div>
  );
};
