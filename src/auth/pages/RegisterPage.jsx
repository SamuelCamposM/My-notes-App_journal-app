import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { validarEmail } from "../helper/validarEmail";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";
import { useMemo } from "react";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => validarEmail(value), "El formato del correo no es valido"],
  password: [
    (value) => value.length >= 6,
    "El password debe de tener mas de 6 letras",
  ],
  displayName: [(value) => value.length >= 1, "El Nombre es obligatorio"],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );
  const {
    //ESTADO
    formState,
    email,
    password,
    displayName,
    isFormValid,
    emailValid,
    passwordValid,
    displayNameValid,
    // METODOS
    setIsSubmited,
    onInputChange,
  } = useForm(formData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmited(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };
  return (
    <AuthLayout title="Crear Cuenta">
      <h1>Form valid {isFormValid ? "Valido" : "Incorrecto"} </h1>
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Samuel Campos"
              fullWidth
              value={displayName}
              name={"displayName"}
              onChange={onInputChange}
              error={!!displayNameValid}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="s.cmelara13@gmail.com"
              fullWidth
              value={email}
              name={"email"}
              onChange={onInputChange}
              error={!!emailValid}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Ingrese su contraseña"
              fullWidth
              value={password}
              name={"password"}
              onChange={onInputChange}
              error={!!passwordValid}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error"> {errorMessage} </Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={"row"} justifyContent={"end"}>
            <Typography>Ya tienes cuenta? </Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
