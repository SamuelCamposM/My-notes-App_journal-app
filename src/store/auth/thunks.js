import {
  logoutFirebase,
  registerWithUserEmailPassword,
  signInWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthtentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));
    if (result.ok) return dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, errorMessage, photoURL } =
      await registerWithUserEmailPassword({
        email,
        password,
        displayName,
      });

    if (!ok) return dispatch(logout(errorMessage));
    dispatch(
      login({
        uid,
        email,
        password,
        displayName,
        photoURL,
      })
    );
  };
};

export const startSignInWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { uid, displayName, ok, errorMessage, photoURL } =
      await signInWithEmailPassword({
        email,
        password,
      });

    if (!ok) return dispatch(logout(errorMessage));
    dispatch(
      login({
        uid,
        email,
        password,
        displayName,
        photoURL,
      })
    );
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    try {
      await logoutFirebase();
      dispatch(logout(""));
    } catch (error) {}
  };
};
