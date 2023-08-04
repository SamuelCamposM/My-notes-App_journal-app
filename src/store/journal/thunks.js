import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { loadNotes } from "../../helpers";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    console.log("Start new note");
    //uid
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };
    const newDoc = doc(collection(FirebaseDB, `/${uid}/journal/notes`));

    const setDocRes = await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El uid del usuario no existe");
    console.log({ uid });
    const resNotes = await loadNotes(uid);
    dispatch(setNotes(resNotes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const {
      active: { id, ...rest },
    } = getState().journal;

    console.log({ rest });
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);
    await setDoc(docRef, rest, { merge: true });
    dispatch(updateNote({ id, ...rest }));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    console.log({ files });

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }
    console.log({ fileUploadPromises });
    const photosUrls = await Promise.all(fileUploadPromises);
    console.log({ photosUrls });
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: activeNote } = getState().journal;
    console.log({ uid, activeNote });
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(activeNote.id));
  };
};
