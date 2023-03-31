import React from "react";
import { Feedback } from "../../components/Feedback/Feedback";
import { Info } from "../StartPage/Info/Info";

import "./aboutPage.scss";

export const AboutPage: React.FC = () => {
  return (
    <div className="aboutPage">
      <Info
        title="Кто мы?"
        text="Я молодой разработчик, приношу небольшую пользу окружению. Так как проект молодой и нуждается в дополненительных функциях, вы можете оставить обратную связь ниже в форме. Так же можно оставить объективный отзыв, который пойдет во благо этого приложения."
      />
      <Feedback />
    </div>
  );
};
