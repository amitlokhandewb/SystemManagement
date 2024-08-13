import { Box, Grid, TextField, MenuItem, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { CreateUser, FetchUserbyId, UpdateUseer } from "../../Services/UserServices";
import { fetchRolesAsync } from "../../Services/RoleServices";

const initialData = {
  id: 0,
  username: "",
  email: "",
  password: "",
  roleId: "",
};

function CreateNewUser({ userId, handleClose,fetchData }) {
  const [formData, setFormData] = useState<any>(initialData);
  const [fieldError, setFieldError] = useState<any>(initialData);
  const [roles, setRoles] = useState([]);

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
      setFormData({
        ...formData,
        username: response.userName,
        email: response.email,
        roleId: response.roleId,
        password: response.passwordHash,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e) => {
    const updatedbody = {
      userName: formData.username,
      passwordHash:formData.password,
      email: formData.email,
      roleId: formData.roleId
    }
    e.preventDefault();
    if (validateForm()) {
      if (userId) {
        console.log("Updating User:", formData);
        updatewuser(updatedbody,userId);
        handleClose()
      } else {
        Creaetnewuser(updatedbody);
        console.log("Creating New User:", formData);
        handleClose()
      }
      setFormData(initialData);
    } else {
      console.log("Validation failed");
    }
  };
  const fetchRoles = async () => {
    try {
      const response = await fetchRolesAsync();
      setRoles(response);
    } catch (error) {
      console.error(error);
    }
  };
  const Creaetnewuser = async(data) => {
    try {
      const response = await CreateUser(data);
      console.log("User Created:", response);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }
  const updatewuser = async(data,id) => {
    try {
      const response = await UpdateUseer(data,id);
      console.log("User Created:", response);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchRoles();
  }, []);

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
            disabled={userId}
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
            {roles.map((item, key) => (
              <MenuItem key={key} value={item.id}>
                {item.roleName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          item
          xs={12}
          gap={1}
          style={{ display: "flex", justifyContent: "right" }}
        >
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {userId ? "Update" : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateNewUser;
