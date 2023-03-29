import React from "react";
import { Check, Email, Phone, Telegram } from "@mui/icons-material";
import { useAppSelector } from "../../../hooks/redux-hooks";

import "./halfResume.scss";

interface IProps {
  color: string;
}

export const HalfResume: React.FC<IProps> = ({ color }) => {
  const resume = useAppSelector((state) => state.resumeData.data);

  return (
    <div className="halfResume">
      <div
        className="halfResume__left"
        style={{ backgroundColor: color, minHeight: "1200px" }}
      >
        <div className="halfResume__header">
          {resume?.photo?.imgUrl && (
            <img
              src={resume.photo.imgUrl}
              alt="photo"
              className="halfResume__left-photo"
            />
          )}
          {resume?.baseInfo?.name && (
            <div>
              {resume?.baseInfo?.name && (
                <p className="halfResume__name">{resume.baseInfo.name}</p>
              )}
              {resume?.baseInfo?.middlename && (
                <p className="halfResume__name">{resume.baseInfo.middlename}</p>
              )}
              {resume?.baseInfo?.surname && (
                <p className="halfResume__name halfResume__name--bold">
                  {resume.baseInfo.surname}
                </p>
              )}
            </div>
          )}
        </div>
        {resume?.baseInfo?.position && (
          <p className="halfResume__position">{resume.baseInfo.position}</p>
        )}

        {resume?.baseInfo?.email && (
          <div className="halfResume__category">
            <p className="halfResume__title">Контакты</p>
            <div>
              {resume?.baseInfo?.email && (
                <div className="halfResume__contact">
                  <Email sx={{ fill: "#ffffff" }} />
                  <a href={"mailto:" + resume.baseInfo.email}>
                    {resume.baseInfo.email}
                  </a>
                </div>
              )}
              {resume?.baseInfo?.phone && (
                <div className="halfResume__contact">
                  <Phone sx={{ fill: "#ffffff" }} />
                  <a href={"tel:" + resume.baseInfo.phone}>
                    {resume.baseInfo.phone}
                  </a>
                </div>
              )}
              {resume?.baseInfo?.telegram && (
                <div className="halfResume__contact">
                  <Telegram sx={{ fill: "#ffffff" }} />
                  <a
                    href={"https://t.me/" + resume.baseInfo.telegram}
                    target="_blank"
                  >
                    {resume.baseInfo.telegram}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {resume?.skills?.skill1 && (
          <div className="halfResume__category">
            <p className="halfResume__title">Навыки</p>
            <div>
              {resume?.skills?.skill1 && (
                <div className="halfResume__skill">
                  <Check sx={{ fill: "#ffffff" }} />
                  <p>{resume.skills.skill1}</p>
                </div>
              )}
              {resume?.skills?.skill2 && (
                <div className="halfResume__contact">
                  <Check sx={{ fill: "#ffffff" }} />
                  <p>{resume.skills.skill2}</p>
                </div>
              )}
              {resume?.skills?.skill3 && (
                <div className="halfResume__contact">
                  <Check sx={{ fill: "#ffffff" }} />
                  <p>{resume.skills.skill3}</p>
                </div>
              )}
              {resume?.skills?.skill4 && (
                <div className="halfResume__contact">
                  <Check sx={{ fill: "#ffffff" }} />
                  <p>{resume.skills.skill4}</p>
                </div>
              )}
              {resume?.skills?.skill5 && (
                <div className="halfResume__contact">
                  <Check sx={{ fill: "#ffffff" }} />
                  <p>{resume.skills.skill5}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {resume?.languages?.language1 && (
          <div className="halfResume__category">
            <p className="halfResume__title">Языки</p>
            <div>
              {resume?.languages?.language1 && (
                <div className="halfResume__languages">
                  <p className="halfResume__languages-lang">
                    {resume.languages.language1}
                  </p>
                  <p className="halfResume__languages-level">
                    {resume.languages.languageLevel1}
                  </p>
                </div>
              )}
              {resume?.languages?.language2 && (
                <div className="halfResume__languages">
                  <p className="halfResume__languages-lang">
                    {resume.languages.language2}
                  </p>
                  <p className="halfResume__languages-level">
                    {resume.languages.languageLevel2}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="halfResume__right">
        {resume?.extraBlock?.information && (
          <div className="halfResume__category">
            <p
              className="halfResume__title"
              style={{ color, borderColor: color }}
            >
              Общая информация
            </p>
            <div>
              {resume?.baseInfo?.telegram && (
                <div className="halfResume__contact">
                  {resume.extraBlock.information}
                </div>
              )}
            </div>
          </div>
        )}

        {resume?.education?.university && (
          <div className="halfResume__category">
            <p
              className="halfResume__title"
              style={{ color, borderColor: color }}
            >
              Образование
            </p>
            <div>
              {resume?.education?.startedLearn && (
                <p className="halfResume__contact">
                  {resume.education.startedLearn} -{" "}
                  {resume.education.isLearningNow
                    ? "по наст. время"
                    : resume.education.finishedLearn}
                </p>
              )}
              {resume?.education?.university && (
                <p className="halfResume__contact halfResume__contact--bold">
                  {resume.education.university}
                </p>
              )}
              {resume?.education?.academicDegree && (
                <p className="halfResume__contact">
                  {resume.education.academicDegree}
                </p>
              )}
              {resume?.education?.faculty && (
                <p className="halfResume__contact">
                  {resume.education.faculty}
                </p>
              )}
              {resume?.education?.specialization && (
                <p className="halfResume__contact">
                  {resume.education.specialization}
                </p>
              )}
            </div>
          </div>
        )}

        {resume?.experience?.companyName && (
          <div className="halfResume__category">
            <p
              className="halfResume__title"
              style={{ color, borderColor: color }}
            >
              Опыт работы
            </p>
            <div>
              {resume?.experience?.startYear && (
                <p className="halfResume__contact">
                  {resume.experience.startMonth +
                    " " +
                    resume.experience.startYear}{" "}
                  -{" "}
                  {resume.experience.isWorkingNow
                    ? "по наст. время"
                    : resume.experience.endMonth +
                      " " +
                      resume.experience.endYear}
                </p>
              )}

              {resume?.experience?.companyName && (
                <div className="halfResume__contact halfResume__contact--bold">
                  {resume.experience.companyName}
                </div>
              )}

              {resume?.experience?.link && (
                <div className="halfResume__contact">
                  <a
                    className="halfResume__link"
                    href={resume.experience.link}
                    target="_blank"
                  >
                    {resume.experience.link}
                  </a>
                </div>
              )}

              {resume?.experience?.obligations && (
                <div className="halfResume__contact">
                  {resume.experience.obligations}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
