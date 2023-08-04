import { collection, getDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid) => {
  if (!uid) throw new Error("El uid del usuario no existe");
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes = docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log({ notes });
  return notes;
};
