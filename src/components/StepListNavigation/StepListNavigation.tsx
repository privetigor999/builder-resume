import React from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { ITab } from "../../store/tabSlice/types";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { StepItemNavigation } from "./StepItemNavigation/StepItemNavigation";

import "./stepListNavigation.scss";

export const StepListNavigation: React.FC = () => {
  const listOfTabs = useAppSelector((state) => state.resumeTab.listOfTabs);
  return (
    <nav className="stepNavigaion">
      <ul className="stepNavigaion__list">
        {listOfTabs.map((tab: ITab) => (
          <StepItemNavigation key={tab.id} {...tab} />
        ))}
      </ul>
    </nav>
  );
};
