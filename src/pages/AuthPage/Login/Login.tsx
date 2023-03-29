import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/Form/Form";
import { Input } from "../../../components/Input/Input";
import { SaveButton } from "../../../components/SaveButton/SaveButton";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { setUser } from "../../../store/userSlice/userReducer";
import { useNavigate } from "react-router-dom";
import { fetchResume } from "../../../store/resumeData/resumeActions";

export const Login: React.FC = () => {
  const [isFullfiled, setIsFullfiled] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, getValues, handleSubmit } = useForm({
    mode: "onBlur",
  });

  const onSubmit = () => {
    const auth = getAuth();
    setIsFullfiled(true);
    signInWithEmailAndPassword(
      auth,
      getValues().signUpLogin,
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
        dispatch(fetchResume());

        navigate("/resume");
      })
      .catch(() => {
        setIsFullfiled(false);
        console.error;
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("signUpLogin")}
        id="signUpLogin"
        label="Логин"
        width="100%"
        required
      />
      <Input
        {...register("signUpPassword")}
        id="signUpPassword"
        label="Пароль"
        width="100%"
        required
      />

      <SaveButton
        title={"Вы успешно вошли"}
        errorMes={"Вы ввели неправильно логин или пароль"}
        isFullfiled={isFullfiled}
        fullWidth
      >
        Войти
      </SaveButton>
    </Form>
  );
};
