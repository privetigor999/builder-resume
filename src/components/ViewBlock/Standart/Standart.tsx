import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";

import {
  Email,
  Phone,
  Telegram,
  School,
  Work,
  LocalLibrary,
  Translate,
} from "@mui/icons-material/";

import "./standart.scss";
import { HexColorPicker } from "react-colorful";

interface IStandartProps {
  color: string;
}

export const Standart: React.FC<IStandartProps> = ({ color }) => {
  const resume = useAppSelector((state) => state.resumeTab.resume);

  return (
    <div className="standart" style={{ transform: "scale(70%)" }}>
      <header className="standart__header">
        {resume.photo && (
          <img className="standart__photo" src={resume.photo} alt="photo" />
        )}
        <div>
          <div style={{ color }}>
            <p className="standart__name">
              {resume.base?.name} {resume.base?.middlename}
            </p>
            <b className="standart__surname"> {resume.base?.surname} </b>
          </div>
          {resume?.base?.position && (
            <p className="standart__position">{resume.base.position}</p>
          )}
        </div>
      </header>
      <div className="standart__contacts" style={{ backgroundColor: color }}>
        {resume?.base?.email && (
          <div className="standart__contact">
            <Email sx={{ fill: "#ffffff" }} />
            <a href={"mailto:" + resume.base.email}>{resume.base.email}</a>
          </div>
        )}
        {resume?.base?.phone && (
          <div className="standart__contact">
            <Phone sx={{ fill: "#ffffff" }} />
            <a href={"tel:" + resume.base.phone}>{resume.base.phone}</a>
          </div>
        )}
        {resume?.base?.telegram && (
          <div className="standart__contact">
            <Telegram sx={{ fill: "#ffffff" }} />
            <a href={"https://t.me/" + resume.base.telegram} target="_blank">
              {resume.base.telegram}
            </a>
          </div>
        )}
      </div>

      <div className="standart__main">
        <div className="standart__left">
          {resume?.education?.university && (
            <div className="standart__category">
              <div className="standart__category-title">
                <School sx={{ fontSize: "50px", fill: color }} />
                <p style={{ color }}>Образование</p>
              </div>
              <div
                className="standart__category-main"
                style={{ borderColor: color }}
              >
                <div className="standart__category-head">
                  <p className="standart__category-bold">
                    {resume?.education?.university}
                  </p>
                  <p>
                    {resume?.education?.startedLearn} -{" "}
                    {resume?.education?.isLearningNow
                      ? "по наст. время"
                      : resume?.education?.finishedLearn}
                  </p>
                </div>
                <div>
                  {resume?.education?.academicDegree && (
                    <p>{resume.education.academicDegree}</p>
                  )}
                  {resume?.education?.faculty && (
                    <p>Факультет: {resume.education.faculty}</p>
                  )}
                  {resume?.education?.specialization && (
                    <p>Специализация: {resume.education.specialization}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {resume?.experience?.companyName && (
            <div className="standart__category">
              <div className="standart__category-title">
                <Work sx={{ fontSize: "50px", fill: color }} />
                <p style={{ color }}>Опыт работы</p>
              </div>
              <div
                className="standart__category-main"
                style={{ borderColor: color }}
              >
                <div className="standart__category-head">
                  <p className="standart__category-bold">
                    {resume?.experience?.companyName}
                  </p>
                  <p>
                    {resume?.experience?.startMonth}{" "}
                    {resume?.experience?.startYear} -{" "}
                    {resume?.experience?.isWorkingNow
                      ? "по наст. время"
                      : `${resume?.experience?.endMonth} ${resume?.experience?.endYear}`}
                  </p>
                </div>
                <div>
                  {resume.experience?.department && (
                    <p>Отдел: {resume.experience.department}</p>
                  )}
                  {resume.experience?.position && (
                    <p>Должность: {resume.experience.position}</p>
                  )}
                  {resume?.experience?.obligations && (
                    <p>Обязанности: {resume.experience.obligations}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {resume?.courses?.coursesName && (
            <div className="standart__category">
              <div className="standart__category-title">
                <LocalLibrary sx={{ fontSize: "50px", fill: color }} />
                <p style={{ color }}>Курсы</p>
              </div>
              <div
                className="standart__category-main"
                style={{ borderColor: color }}
              >
                <div className="standart__category-head">
                  <p className="standart__category-bold">
                    {resume?.courses?.coursesCompany}
                  </p>

                  {resume?.courses?.coursesEnd && (
                    <p>{resume.courses.coursesEnd}</p>
                  )}
                </div>
                <div>
                  {resume?.courses?.coursesName && (
                    <p>{resume.courses.coursesName}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="standart__right">
          {resume?.languages?.language1 && (
            <div className="standart__category">
              <div className="standart__category-title">
                <Translate sx={{ fontSize: "50px", fill: color }} />
                <p style={{ color }}>Владения языками</p>
              </div>
              <div
                className="standart__category-main"
                style={{ borderColor: color }}
              >
                <div className="standart__category-head">
                  <p className="standart__category-bold">
                    {resume?.languages?.language1}
                  </p>

                  {resume?.languages?.languageLevel1 && (
                    <p>{resume.languages.languageLevel1}</p>
                  )}
                </div>
                <div className="standart__category-head">
                  <p className="standart__category-bold">
                    {resume?.languages?.language2}
                  </p>

                  {resume?.languages?.languageLevel1 && (
                    <p>{resume.languages.languageLevel2}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
