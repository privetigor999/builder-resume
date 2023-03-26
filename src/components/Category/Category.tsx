import React from "react";

import "./category.scss";
import {
  Work,
  AccessibilityTwoTone,
  PhoneAndroid,
  AlternateEmail,
  School,
  Stairs,
  LocalLibrary,
  Translate,
  AddAPhoto,
} from "@mui/icons-material/";

interface ICategory {
  children: React.ReactNode;
  title: string;
  icon: string;
}

const icons = {
  man: <AccessibilityTwoTone sx={{ fontSize: 30 }} />,
  phone: <PhoneAndroid sx={{ fontSize: 30 }} />,
  contact: <AlternateEmail sx={{ fontSize: 30 }} />,
  position: <Work sx={{ fontSize: 30 }} />,
  education: <School sx={{ fontSize: 30 }} />,
  work: <Work sx={{ fontSize: 30 }} />,
  courses: <LocalLibrary sx={{ fontSize: 30 }} />,
  languages: <Translate sx={{ fontSize: 30 }} />,
  photo: <AddAPhoto sx={{ fontSize: 30 }} />,
};

export const Category: React.FC<ICategory> = ({ children, title, icon }) => {
  return (
    <div className="category">
      <div className="category__titleBlock">
        <div className="category__icon">
          {icons[icon as keyof typeof icons]}
        </div>
        <h1 className="category__title">{title}</h1>
        <div />
        <hr className="category__line" />
      </div>

      {children}
    </div>
  );
};
