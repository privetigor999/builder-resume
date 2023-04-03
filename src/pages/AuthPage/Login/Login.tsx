import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/Form/Form";
import { SaveButton } from "../../../components/SaveButton/SaveButton";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { setUser } from "../../../store/userSlice/userReducer";
import { useNavigate } from "react-router-dom";
import { fetchResume } from "../../../store/resumeData/resumeActions";
import { TextField } from "@mui/material";

export const Login: React.FC = () => {
  const [isFullfiled, setIsFullfiled] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, getValues, handleSubmit } = useForm({
    mode: "onBlur",
  });

  const inputStyles = {
    width: "100%",
    marginBottom: "20px",
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };

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
    <div style={{ width: "100%", maxWidth: "500px" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("signUpLogin")}
          id="signUpLogin"
          sx={inputStyles}
          label="Логин"
          required
        />
        <TextField
          {...register("signUpPassword")}
          id="signUpPassword"
          label="Пароль"
          sx={inputStyles}
          required
        />

        <SaveButton
          title={"Вы успешно вошли"}
          errorMes={"Вы ввели неправильно логин или пароль"}
          isFullfiled={isFullfiled}
          width="100%"
        >
          Войти
        </SaveButton>
      </Form>
    </div>
  );
};
