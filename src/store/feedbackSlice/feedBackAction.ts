import { createAsyncThunk } from "@reduxjs/toolkit";
import { send } from "emailjs-com";

export const fetchForm = createAsyncThunk<any, any, { rejectValue: any }>(
  "form/fetchForm",
  async (form: any, { rejectWithValue }) => {
    try {
      const response = await send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
        form,
        import.meta.env.VITE_EMAILJS_USER_ID as string
      );

      return response.text;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
