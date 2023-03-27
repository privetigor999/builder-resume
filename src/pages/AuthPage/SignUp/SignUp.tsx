import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/Form/Form";
import { Input } from "../../../components/Input/Input";
import { SaveButton } from "../../../components/SaveButton/SaveButton";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { setUser } from "../../../store/userSlice/userReducer";
import { signUpSchema } from "../../../utils/schema/signUpSchema";

export const SignUp: React.FC = () => {
  const [isFullfiled, setIsFullfiled] = React.useState(false);
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
    const auth = getAuth();

    createUserWithEmailAndPassword(
      auth,
      getValues().signUpEmail,
      getValues().signUpPassword
    )
      .then(({ user }) => {
        setIsFullfiled(true);
        console.log(user);
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
        setIsFullfiled(false);
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("signUpEmail")}
        id="signUpEmail"
        label="Почта"
        error={!!errors?.signUpEmail}
        helperText={errors?.signUpEmail?.message}
        required
      />
      <Input
        {...register("signUpPassword")}
        id="signUpPassword"
        label="Пароль"
        error={!!errors?.signUpPassword}
        helperText={errors?.signUpPassword?.message}
        required
      />

      <SaveButton
        title={"QQQQQQQ"}
        errorMes={errorMes}
        isFullfiled={isFullfiled}
        color={"primary"}
      >
        Зарегистрироваться
      </SaveButton>
    </Form>
  );
};
