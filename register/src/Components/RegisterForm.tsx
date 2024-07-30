import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { RegisterAsync } from "../Services/RegisterServices";
import { toast } from "react-toastify";
import { navigateToUrl } from "single-spa";

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  roleId: number;
}
export interface RegisterFieldErrors {
  username?: string;
  email?: string;
  password?: string;
  roleId?: string;
}

function RegisterForm() {
  const [formData, setformData] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    roleId: 0,
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setfieldErrors] = useState<RegisterFieldErrors>({});
  const SendRegister = async () => {
    const updatedFormData = {
      username: formData.username,
      email: formData.email,
      PasswordHash: formData.password,
      roleId: formData.roleId,
    };
    const response = await RegisterAsync(updatedFormData);
    if (response?.status === 200) {
      toast.success(`${response?.data}`, {
        position: "top-right",
      });
      setformData({
        username: "",
        email: "",
        password: "",
        roleId: 0,
      });
      navigateToUrl("/login");

    } else {
      toast.error(`${response.response.data}`, {
        position: "top-right",
      });
    }
    setLoading(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      setLoading(true);
      SendRegister();
    }
  };
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email address";
  };
  const validatePassword = (password: string) => {
    return password.length >= 8
      ? ""
      : "Password must be at least 6 characters long";
  };
  const validateFields = () => {
    const errors: RegisterFieldErrors = {};
    if (formData.username.length < 10) {
      errors.username = "Username must be at least 10 characters long";
    }
    if (formData.roleId <= 0) {
      errors.roleId = "Please select a role";
    }
    errors.email = validateEmail(formData.email);
    errors.password = validatePassword(formData.password);
    setfieldErrors(errors);
    return Object.keys(errors).every(
      (key) => !errors[key as keyof RegisterFieldErrors]
    );
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    let error = "";
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }
    if (name === "username" && value.length < 10) {
      error = "PLease enter the username";
    }
    if (name === "roleId" && value === 0) {
      error = "Please select the role";
    }
    setfieldErrors({ ...fieldErrors, [name]: error });
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ ml: "200px", mr: "200px", mt: "30px" }}
    >
      <Typography variant="h4" color={"#3dcd58"} gutterBottom>
        Register{" "}
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        autoComplete="off"
        id="username"
        label="Enter your Username"
        name="username"
        error={!!fieldErrors.username}
        helperText={fieldErrors.username}
        value={formData.username}
        onChange={handleInputChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        autoComplete="off"
        id="email"
        label="Enter your Email Address"
        name="email"
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
        label="Enter your Password"
        type="password"
        id="password"
        autoComplete="off"
        error={!!fieldErrors.password}
        helperText={fieldErrors.password}
        value={formData.password}
        onChange={handleInputChange}
      />
      <FormControl fullWidth sx={{ mt: 2 }} error={!!fieldErrors.roleId}>
        <InputLabel id="demo-simple-select-label">Select yout Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.roleId.toString()}
          label="Select yout Role"
          name="roleId"
          onChange={handleInputChange}
        >
          <MenuItem value={1}>Admin</MenuItem>
          <MenuItem value={2}>Manager</MenuItem>
          <MenuItem value={3}>Engineer</MenuItem>
        </Select>
      </FormControl>
      {fieldErrors.roleId && (
        <FormHelperText sx={{ color: "#D32F2F" }}>
          {fieldErrors.roleId}
        </FormHelperText>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, backgroundColor: "#3dcd58" }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/login" color="inherit">
           Already have an Account
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterForm;
