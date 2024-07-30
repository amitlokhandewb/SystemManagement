import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { LoginAsync } from "../Services/LoginService";
import { navigateToUrl } from "single-spa";
import { toast } from "react-toastify";
export interface LoginForm {
  email: string;
  password: string;
}
export interface LoginFieldErrors {
  email?: string;
  password?: string;
}
function LoginForm() {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email address";
  };

  const validatePassword = (password: string) => {
    return password.length >= 8
      ? ""
      : "Password must be at least 6 characters long";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = "";
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }
    setFieldErrors({ ...fieldErrors, [name]: error });
  };

  const validateFields = () => {
    const errors: LoginFieldErrors = {};
    errors.email = validateEmail(formData.email);
    errors.password = validatePassword(formData.password);
    setFieldErrors(errors);
    return Object.keys(errors).every(
      (key) => !errors[key as keyof LoginFieldErrors]
    );
  };

  const SendLogins = async () => {
    try {
      const response = await LoginAsync(formData);
      console.log(response)
      if (response?.status === 200) {
        toast.success(`Welcome ${response?.data.fullname}`, {
          position: "top-right",
        });
        setFormData({
          email: "",
          password: "",
        });
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem("username", response.data.fullname);
        setLoading(false);
         setTimeout(() => {
           window.location.href = '/'
         }, 1000);
      }
    } catch (error) {
      //console.error(error.response.data);
      if(error?.response?.status === 401){
        toast.error(error.response.data, {
            position: "top-right",
            });
      }else{
        toast.error(`${error?.message}`, {
            position: "top-right",
          });
      }
    
      setLoading(false);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      setLoading(true);
      SendLogins();
      //   navigateToUrl("/");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ ml: "200px", mr: "200px", mt: "100px" }}
    >
      <Typography variant="h4" color={"#3dcd58"} gutterBottom>
        Login{" "}
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        autoComplete="off"
        id="email"
        label="Email Address"
        name="email"
        autoFocus
        error={!!fieldErrors.email}
        helperText={fieldErrors.email}
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="off"
        error={!!fieldErrors.password}
        helperText={fieldErrors.password}
        value={formData.password}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, backgroundColor: "#3dcd58" }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Sign In"}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/register" color="inherit">
            Create an Account
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginForm;
