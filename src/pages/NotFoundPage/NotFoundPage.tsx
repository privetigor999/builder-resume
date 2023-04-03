import React from "react";
import { useNavigate } from "react-router-dom";
import { useLottie } from "lottie-react";
import { Button } from "@mui/material";

import "./notFoundPage.scss";
import errorLottie from "./../../assets/lottie/error404.json";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const clickButtonHandler = () => {
    navigate("/");
  };

  const style = {
    height: 200,
  };

  const options = {
    animationData: errorLottie,
  };

  const { View } = useLottie(options, style);
  return (
    <div className="notFoundPage">
      <h1>Ошибка 404</h1>
      <div>{View}</div>
      <p>Такой страницы не существует</p>
      <Button
        onClick={clickButtonHandler}
        sx={{ marginTop: "30px" }}
        variant="contained"
      >
        На главную
      </Button>
    </div>
  );
};
