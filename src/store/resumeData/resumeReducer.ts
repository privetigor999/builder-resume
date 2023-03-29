import { createSlice } from "@reduxjs/toolkit";
import { IResumeData } from "../../types/types";
import { fetchResume } from "./resumeActions";

interface IState {
  status: string;
  data: IResumeData | any;
}

const initialState: IState = {
  status: "",
  data: [],
};

const resumeDataSlice = createSlice({
  name: "resumeData",
  initialState,
  reducers: {
    removeData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResume.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});

export const { removeData } = resumeDataSlice.actions;
export default resumeDataSlice.reducer;
