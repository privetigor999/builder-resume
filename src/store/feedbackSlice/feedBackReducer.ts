import { createSlice } from "@reduxjs/toolkit";
import { fetchForm } from "./feedBackAction";

interface IState {
  formStatus: "loading" | "success" | "reject" | "idle";
  errorMessage: string;
}

const initialState: IState = {
  formStatus: "idle",
  errorMessage: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForm.pending, (state) => {
      state.errorMessage = "";
      state.formStatus = "loading";
    });

    builder.addCase(fetchForm.fulfilled, (state) => {
      state.formStatus = "success";
    });

    builder.addCase(fetchForm.rejected, (state, action) => {
      state.errorMessage = action.payload.text;
      state.formStatus = "reject";
    });
  },
});

export default formSlice.reducer;
