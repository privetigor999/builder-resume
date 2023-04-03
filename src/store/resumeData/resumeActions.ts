import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../../firebase";

export const fetchResume = createAsyncThunk(
  "resumeData/fetchResume",
  async (_, { getState, rejectWithValue }) => {
    try {
      let resume: any = [];
      const { id } = getState().user;

      const docRef = doc(db, "resume", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        resume = docSnap.data();
      } else {
        console.log("No such document!");
      }

      return resume;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBlockResume = createAsyncThunk(
  "resumeData/deleteBlockResume",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { id } = getState().user;

      const docRef = doc(db, "resume", id);

      await updateDoc(docRef, {
        photo: deleteField(),
      });
      dispatch(fetchResume());
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
