import { Box, Grid, TextField, MenuItem, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FetchUserbyId } from "../../Services/UserServices";

const initialData = {
  id: 0,
  username: "",
  email: "",
  password: "",
  roleId: "",
};

function CreateNewUser({ userId }) {
  const [formData, setFormData] = useState<any>(initialData);
  const [fieldError, setFieldError] = useState<any>(initialData);

  useEffect(() => {
    if (userId > 0) {
      fetchUserbyidasync(userId);
    }
  }, [userId]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email address";
  };

  const validatePassword = (password) => {
    return password.length >= 8
      ? ""
      : "Password must be at least 8 characters long";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    } else if (name === "username") {
      error = value === "" ? "Username is required." : "";
    } else if (name === "roleId") {
      error = value === "" ? "Role selection is required." : "";
    }

    setFormData({ ...formData, [name]: value });
    setFieldError({ ...fieldError, [name]: error });
  };

  const validateForm = () => {
    const errors = {
      username: formData.username === "" ? "Username is required." : "",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      roleId: formData.roleId === "" ? "Role selection is required." : "",
    };
    setFieldError(errors);
    return !Object.values(errors).some((error) => error !== "");
  };
  const fetchUserbyidasync = async (id) => {
    try {
      const response = await FetchUserbyId(id);
      console.log("user by id", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (formData.id) {
        console.log("Updating User:", formData);
      } else {
        console.log("Creating New User:", formData);
      }
      setFormData(initialData);
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            error={!!fieldError.username}
            helperText={fieldError.username}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!fieldError.email}
            helperText={fieldError.email}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!fieldError.password}
            helperText={fieldError.password}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            name="roleId"
            label="Role"
            select
            fullWidth
            value={formData.roleId}
            onChange={handleChange}
            error={!!fieldError.roleId}
            helperText={fieldError.roleId}
          >
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>User</MenuItem>
            <MenuItem value={3}>Manager</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {formData.id ? "Update" : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateNewUser;
