import {
  Build,
  ContentCopy,
  Devices,
  Gavel,
  LocalDining,
  LocalHospital,
  LocalTaxi,
  MusicNote,
  Psychology,
  School,
  Theaters,
} from "@mui/icons-material";
import React from "react";

import "./employeeList.scss";

export const EmployeeList: React.FC = () => {
  return (
    <div className="employeeList">
      <h5>Кому подойдет наш сервис?</h5>
      <ul className="employeeList__list">
        <li className="employeeList__item">
          <p>IT-специалист</p>
          <Devices />
        </li>
        <li className="employeeList__item">
          <p>Врач</p>
          <LocalHospital />
        </li>
        <li className="employeeList__item">
          <p>Юрист</p>
          <Gavel />
        </li>
        <li className="employeeList__item">
          <p>Ученый</p>
          <Psychology />
        </li>
        <li className="employeeList__item">
          <p>Машинист / таксист</p>
          <LocalTaxi />
        </li>
        <li className="employeeList__item">
          <p>Копирайтер</p>
          <ContentCopy />
        </li>
        <li className="employeeList__item">
          <p>Мастер</p>
          <Build />
        </li>
        <li className="employeeList__item">
          <p>Музыкант</p>
          <MusicNote />
        </li>
        <li className="employeeList__item">
          <p>Актер</p>
          <Theaters />
        </li>
        <li className="employeeList__item">
          <p>Повар</p>
          <LocalDining />
        </li>
        <li className="employeeList__item">
          <p>Учитель</p>
          <School />
        </li>
        <li className="employeeList__item">
          <p>И многим другим...</p>
        </li>
      </ul>
    </div>
  );
};
