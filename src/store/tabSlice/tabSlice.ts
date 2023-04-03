import { createSlice } from "@reduxjs/toolkit";
import { ITab } from "./types";

interface IState {
  currentTab: number;
  listOfTabs: ITab[];
}

const initialState: IState = {
  currentTab: 1,
  listOfTabs: [
    { id: 1, title: "О вас", value: "baseInfo" },
    { id: 2, title: "Фото", value: "photo" },
    { id: 3, title: "Образование", value: "education" },
    { id: 4, title: "Опыт", value: "experience" },
    { id: 5, title: "Курсы", value: "courses" },
    { id: 6, title: "Языки", value: "languages" },
    { id: 7, title: "Навыки", value: "skills" },
    { id: 8, title: "Доп. инфо", value: "extraBlock" },
    { id: 9, title: "Дизайн", value: "design" },
    { id: 10, title: "Просмотр", value: "viewBlock" },
  ],
};

const tabSlice = createSlice({
  name: "resumeTab",
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = tabSlice.actions;
export default tabSlice.reducer;
