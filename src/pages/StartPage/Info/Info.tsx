import React from "react";

import "./info.scss";

interface InfoProps {
  title: string;
  text: string;
}

export const Info: React.FC<InfoProps> = ({ title, text }) => {
  return (
    <div className="info">
      <h5>{title}</h5>
      <p>{text}</p>
    </div>
  );
};
