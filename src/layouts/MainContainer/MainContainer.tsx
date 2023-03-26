import React from "react";

import "./mainContainer.scss";

interface IMainContainerProps {
  children: React.ReactNode;
}

export const MainContainer: React.FC<IMainContainerProps> = ({ children }) => {
  return <main className="mainContainer">{children}</main>;
};
