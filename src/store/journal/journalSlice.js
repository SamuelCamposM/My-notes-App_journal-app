import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth";
const initialState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
  // active: {
  //   id: "ABC123",
  //   title: "",
  //   body: "",
  //   date: 1234567,
  //   imageUrls: [], //"https:"
  // },
};
export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state, action) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, { payload }) => {
      console.log({ payload });
      state.notes = payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, { payload }) => {
      state.notes = state.notes.map((note) =>
        note.id === payload.id ? payload : note
      );
      state.isSaving = false;
      state.messageSaved = `${payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action) => {
      console.log({ action });
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    deleteNoteById: (state, { payload }) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
} = journalSlice.actions;
