import React from "react";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";

import "./mobileWarning.scss";
import catSadLottie from "./../../assets/lottie/catSad.json";
import { useLottie } from "lottie-react";

const style = {
  height: 200,
  marginTop: 100,
};

const options = {
  animationData: catSadLottie,
  loop: true,
  autoplay: true,
};

export const MobileWarning = () => {
  const { View } = useLottie(options, style);
  return (
    <MainContainer>
      <div className="mobileWarning">
        <div>{View}</div>
        <p>
          Редактор резюме не доступен на мобильных стройствах. Для вашего
          удобства просим вас зайти с планшета, ноутбука или компьютера.
        </p>
      </div>
    </MainContainer>
  );
};
