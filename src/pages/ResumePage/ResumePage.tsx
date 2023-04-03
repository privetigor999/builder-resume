import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { BaseBlock } from "../../components/BaseBlock/BaseBlock";
import { CoursesBlock } from "../../components/CoursesBlock/CoursesBlock";
import { DesignBlock } from "../../components/DesignBlock/DesignBlock";
import { EducationBlock } from "../../components/EducationBlock/EducationBlock";
import { ExtraInfoBlock } from "../../components/ExtraInfoBlock/ExtraInfoBlock";
import { Helper } from "../../components/Helper/Helper";
import { LanguagesBlock } from "../../components/LanguagesBlock/LanguagesBlock";
import { Loader } from "../../components/Loader/Loader";
import { MobileWarning } from "../../components/MobileWarning/MobileWarning";
import { PhotoBlock } from "../../components/PhotoBlock/PhotoBlock";
import { Skills } from "../../components/Skills/Skills";
import { StepListNavigation } from "../../components/StepListNavigation/StepListNavigation";
import { ViewBlock } from "../../components/ViewBlock/ViewBlock";
import { WorkExperienceBlock } from "../../components/WorkExperienceBlock/WorkExperienceBlock";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useAuth } from "../../hooks/useAuth";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { helpers } from "../../utils/data";

import "./resumePage.scss";

export default function ResumePage() {
  const currentTab = useAppSelector((state) => state.resumeTab.currentTab);
  const status = useAppSelector((state) => state.resumeData.status);
  const { isAuth } = useAuth();

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
        return <Skills id={id} />;
      case 8:
        return <ExtraInfoBlock id={id} />;
      case 9:
        return <DesignBlock id={id} />;
      case 10:
        return <ViewBlock />;
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
            <StepListNavigation />
            <div className="resumePage__mainBlock">
              {switchBlocks(currentTab)}
              <Helper helpers={helpers[currentTab - 1]} />
            </div>
          </div>
          <MobileWarning />
        </>
      ) : (
        <Navigate to="/auth" replace />
      )}
    </>
  );
}
