import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  startGoogleSignIn,
  startSignInWithEmailPassword,
} from "../../store/auth";
import { useMemo } from "react";
const formData = {
  email: "",
  password: "",
};
export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const { formState, onInputChange, onResetForm, email, password } = useForm(formData);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startSignInWithEmailPassword(formState));
  };
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };
  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label="Correo"
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
              placeholder="s.cmelara13@gmail.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              placeholder="Ingrese su contraseña"
              fullWidth
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error"> {errorMessage} </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                type="submit"
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}> Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={"row"} justifyContent={"end"}>
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crea una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
