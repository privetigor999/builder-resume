import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useAuth } from "../../hooks/useAuth";

export const fetchResume = createAsyncThunk(
  "resumeData/fetchResume",
  async (_, { getState }) => {
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
      console.log(error);
    }
  }
);

export const deleteBlockResume = createAsyncThunk(
  "resumeData/deleteBlockResume",
  async (_, { getState, dispatch }) => {
    try {
      const { id } = getState().user;

      const docRef = doc(db, "resume", id);

      await updateDoc(docRef, {
        photo: deleteField(),
      });
      dispatch(fetchResume());
      return;
    } catch (error) {
      console.log(error);
    }
  }
);
