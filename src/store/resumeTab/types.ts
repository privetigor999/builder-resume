import { string } from "yup";

export interface ITab {
  id: number;
  title: string;
  value: string;
}

export interface IBase {
  position: string;
  salary?: string;
  name: string;
  middlename?: string;
  surname: string;
  dateBirthday?: string;
  phone?: string;
  email?: string;
  telegram: string;
}

export interface IEducation {
  university: string;
  startedLearn: string;
  isLearningNow: boolean;
  finishedLearn?: number;
  faculty: string;
  specialization?: string;
  academicDegree: string;
}

export interface IExperince {
  companyName: string;
  position: string;
  department?: string;
  startMonth: string;
  startYear: string;
  isWorkingNow: boolean;
  endMonth?: string;
  endYear?: string;
  obligations: string;
}

export interface ICourses {
  coursesCompany: string;
  coursesName: string;
  coursesEnd?: string;
}

export interface ILanguages {
  language1: string;
  languageLevel1?: string;
  language2: string;
  languageLevel2?: string;
}

export type IPhoto = string | null;

export type IDesign = undefined | "new" | "standart";
