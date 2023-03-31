import { number, string } from "yup";

export interface IBlockProps {
  id: number;
}

export interface IResumeData {
  baseInfo?: IBase;
  courses?: ICourses;
  design?: IDesign;
  education?: IEducation;
  experience?: IExperince;
  extraBlock?: IExtraBlock;
  languages?: ILanguages;
  photo?: IPhoto;
  skills?: ISkills;
}

export interface ISkills {
  blockId: number;
  skill1: string;
  skill2: string;
  skill3?: string;
  skill4?: string;
  skill5?: string;
}

export interface IBase {
  blockId: number;
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

export interface IExtraBlock {
  blockId: number;
  information: string;
}

export interface IEducation {
  blockId: number;
  university: string;
  startedLearn: string;
  isLearningNow: boolean;
  finishedLearn?: number;
  faculty: string;
  specialization?: string;
  academicDegree: string;
}

export interface IExperince {
  blockId: number;
  companyName: string;
  position: string;
  department?: string;
  startMonth: string;
  startYear: string;
  isWorkingNow: boolean;
  endMonth?: string;
  endYear?: string;
  obligations: string;
  link?: string;
}

export interface ICourses {
  blockId: number;
  coursesCompany: string;
  coursesName: string;
  coursesEnd?: string;
}

export interface ILanguages {
  blockId: number;
  language1: string;
  languageLevel1?: string;
  language2: string;
  languageLevel2?: string;
}

export interface IPhoto {
  blockId: number;
  imgUrl: string;
}

export interface IDesign {
  blockId: number;
  designName?: "new" | "standart";
}

export interface IAccordion {
  id: number;
  question: string;
  answer: string;
}
