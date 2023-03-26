import { createSlice } from "@reduxjs/toolkit";
import {
  IBase,
  ICourses,
  IDesign,
  IEducation,
  IExperince,
  ILanguages,
  IPhoto,
  ITab,
} from "./types";

interface IState {
  currentTab: number;
  listOfTabs: ITab[];
  resume: {
    base?: IBase;
    education?: IEducation;
    experience?: IExperince;
    courses?: ICourses;
    languages?: ILanguages;
    photo?: IPhoto;
    design?: IDesign;
  };
}

const initialState: IState = {
  currentTab: 1,
  listOfTabs: [
    { id: 1, title: "О вас", isFill: true },
    { id: 2, title: "Фото", isFill: false },
    { id: 3, title: "Образование", isFill: true },
    { id: 4, title: "Опыт", isFill: true },
    { id: 5, title: "Курсы", isFill: false },
    { id: 6, title: "Языки", isFill: false },
    { id: 7, title: "Дизайн", isFill: false },
    { id: 8, title: "Просмотр", isFill: false },
  ],
  resume: {
    base: {
      dateBirthday: "1993-08-05",
      email: "quiz4444@yandex.ru",
      middlename: "Сергеевич",
      name: "Игорь",
      phone: "+7 986 728-53-55",
      position: "Front-End Developer",
      salary: "100.000 рублей",
      surname: "Ершов",
      telegram: "dontRememberMe",
    },
    education: {
      academicDegree: "Студент",
      faculty: "ИЭМ",
      isLearningNow: true,
      specialization: "ИЭМ",
      startedLearn: "2011",
      university: "РХТУ им Менделеева",
    },
    experience: {
      companyName: "QSOFT",
      department: "ФРонтенд",
      endMonth: "Март",
      endYear: "2023",
      isWorkingNow: false,
      obligations: "Разработка , html, scss",
      position: "СТажер",
      startMonth: "Январь",
      startYear: "2023",
    },
    courses: {
      coursesCompany: "Skillbox",
      coursesEnd: "2022",
      coursesName: "Самообразование",
    },
    languages: {
      language1: "Русккий",
      language2: "Английский",
      languageLevel1: "Базовый",
      languageLevel2: "Выше среднего",
    },
  },
};

const resumeTabSlice = createSlice({
  name: "resumeTab",
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    updateResume: (state, action) => {
      state.listOfTabs = state.listOfTabs.map((tab) => {
        if (tab.id === state.currentTab) {
          return { ...tab, isFill: true };
        }
        return tab;
      });
      state.resume = { ...state.resume, ...action.payload };
    },
    clearBlockResume: (state, action) => {
      state.listOfTabs = state.listOfTabs.map((tab) => {
        if (tab.id === action.payload) {
          return { ...tab, isFill: false };
        }
        return tab;
      });
    },
  },
});

export const {
  setCurrentTab,
  updateResume,
  clearBlockResume,
} = resumeTabSlice.actions;
export default resumeTabSlice.reducer;
