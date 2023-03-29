import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { BaseBlock } from "../../components/BaseBlock/BaseBlock";
import { CoursesBlock } from "../../components/CoursesBlock/CoursesBlock";
import { DesignBlock } from "../../components/DesignBlock/DesignBlock";
import { EducationBlock } from "../../components/EducationBlock/EducationBlock";
import { LanguagesBlock } from "../../components/LanguagesBlock/LanguagesBlock";
import { Loader } from "../../components/Loader/Loader";
import { MobileWarning } from "../../components/MobileWarning/MobileWarning";
import { PhotoBlock } from "../../components/PhotoBlock/PhotoBlock";
import { StepListNavigation } from "../../components/StepListNavigation/StepListNavigation";
import { ViewBlock } from "../../components/ViewBlock/ViewBlock";
import { WorkExperienceBlock } from "../../components/WorkExperienceBlock/WorkExperienceBlock";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useAuth } from "../../hooks/useAuth";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { fetchResume } from "../../store/resumeData/resumeActions";

import "./resumePage.scss";

export default function ResumePage() {
  const currentTab = useAppSelector((state) => state.resumeTab.currentTab);
  const status = useAppSelector((state) => state.resumeData.status);
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const firstUpdateRef = useRef(true);

  const switchBlocks = (id: number) => {
    switch (id) {
      case 1:
        return <BaseBlock id={id} />;
      case 2:
        return <PhotoBlock id={id} />;
      case 3:
        return <EducationBlock id={id} />;
      case 4:
        return <WorkExperienceBlock id={id} />;
      case 5:
        return <CoursesBlock id={id} />;
      case 6:
        return <LanguagesBlock id={id} />;
      case 7:
        return <DesignBlock id={id} />;
      case 8:
        return <ViewBlock id={id} />;
    }
  };

  React.useEffect(() => {
    if (firstUpdateRef.current) {
      firstUpdateRef.current = false;
    }
  }, []);

  // Показываем лоадер только при первой загрузке на случай, если данные на бэке уже есть и чтобы они появились в нужных местах (инпутах)
  if (firstUpdateRef.current && status === "loading") {
    return (
      <MainContainer>
        <div className="resumePage__loader">
          <Loader />
        </div>
      </MainContainer>
    );
  }

  return (
    <>
      {isAuth ? (
        <>
          <div className="resumePage">
            <h1>Коструктор резюме</h1>
            <StepListNavigation />
            {switchBlocks(currentTab)}
          </div>
          <MobileWarning />
        </>
      ) : (
        <Navigate to="/auth" replace />
      )}
    </>
  );
}
