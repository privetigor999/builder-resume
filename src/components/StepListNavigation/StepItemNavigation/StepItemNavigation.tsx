import React from "react";
import {
  School,
  AccessibilityTwoTone,
  CheckCircle,
  Work,
  LocalLibrary,
  Translate,
  Brush,
  AddAPhoto,
  DocumentScanner,
} from "@mui/icons-material/";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { setCurrentTab } from "../../../store/resumeTab/resumeTabReducer";

import "./stepItemNavigation.scss";
import { ITab } from "../../../store/resumeTab/types";

export const StepItemNavigation: React.FC<ITab> = ({ title, id, value }) => {
  const data = useAppSelector((state) => state.resumeData.data);

  // Сравнение ID навигации и ID блока в резюме
  const checkId = data[value]?.blockId === id;

  const styles = {
    opacity: checkId ? "1" : "0.6",
    width: "40px",
    height: "40px",
    fill: "#ffffff",
  };

  const dispatch = useAppDispatch();

  const clickStepNavigationHandler = () => {
    dispatch(setCurrentTab(id));
  };

  const classNameTitle = `stepItemNavigation__title ${checkId &&
    "stepItemNavigation__title--fill"}`;

  const icons = {
    1: <AccessibilityTwoTone sx={styles} />,
    2: <AddAPhoto sx={styles} />,
    3: <School sx={styles} />,
    4: <Work sx={styles} />,
    5: <LocalLibrary sx={styles} />,
    6: <Translate sx={styles} />,
    7: <Brush sx={styles} />,
    8: <DocumentScanner sx={styles} />,
  };

  return (
    <div className="stepItemNavigation" onClick={clickStepNavigationHandler}>
      {icons[id]}

      <p className={classNameTitle}>{title}</p>
      {checkId && (
        <CheckCircle
          sx={{ fontSize: 30, color: "#66bb6a" }}
          className="stepItemNavigation__done"
        />
      )}
    </div>
  );
};
