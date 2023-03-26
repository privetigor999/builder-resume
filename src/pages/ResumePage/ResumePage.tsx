import React from "react";
import { BaseBlock } from "../../components/BaseBlock/BaseBlock";
import { CoursesBlock } from "../../components/CoursesBlock/CoursesBlock";
import { DesignBlock } from "../../components/DesignBlock/DesignBlock";
import { EducationBlock } from "../../components/EducationBlock/EducationBlock";
import { LanguagesBlock } from "../../components/LanguagesBlock/LanguagesBlock";
import { MobileWarning } from "../../components/MobileWarning/MobileWarning";
import { PhotoBlock } from "../../components/PhotoBlock/PhotoBlock";
import { StepListNavigation } from "../../components/StepListNavigation/StepListNavigation";
import { ViewBlock } from "../../components/ViewBlock/ViewBlock";
import { WorkExperienceBlock } from "../../components/WorkExperienceBlock/WorkExperienceBlock";
import { useAppSelector } from "../../hooks/redux-hooks";

import "./resumePage.scss";

export default function ResumePage() {
  const currentTab = useAppSelector((state) => state.resumeTab.currentTab);

  const switchBlocks = (id: number) => {
    switch (id) {
      case 1:
        return <BaseBlock />;
      case 2:
        return <PhotoBlock />;
      case 3:
        return <EducationBlock />;
      case 4:
        return <WorkExperienceBlock />;
      case 5:
        return <CoursesBlock />;
      case 6:
        return <LanguagesBlock />;
      case 7:
        return <DesignBlock />;
      case 8:
        return <ViewBlock />;
    }
  };

  return (
    <>
      <div className="resumePage">
        <h1>Коструктор резюме</h1>
        <StepListNavigation />
        {switchBlocks(currentTab)}
      </div>
      <MobileWarning />
    </>
  );
}
