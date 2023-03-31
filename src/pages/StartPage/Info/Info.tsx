import React from "react";

import "./info.scss";

interface InfoProps {
  title: string;
  text: string;
  bgColor?: string;
}

export const Info: React.FC<InfoProps> = ({ title, text, bgColor }) => {
  const colorText = { color: bgColor && "#0b61a4" };
  return (
    <div className="info" style={{ backgroundColor: bgColor && `${bgColor}` }}>
      <h5 style={colorText}>{title}</h5>
      <p style={colorText}> {text}</p>
    </div>
  );
};
