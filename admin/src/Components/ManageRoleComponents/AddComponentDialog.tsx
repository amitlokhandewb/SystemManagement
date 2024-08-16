import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { AddComponent } from "../../Services/RoleMappingService";

const initialData = {
  component: "",
};

function AddComponentDialog({ open, onClose , fetchData }) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({
    component: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors: any = {};
    tempErrors.component = formData.component ? "" : "Component is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully:", formData);
      const res =  AddComponent(formData);
      if (res) {
        setFormData({
            component: "",
          });
          
          onClose();
          
      }
      
    }
    fetchData();
  };

  return (
    <Dialog open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle>{`Create Component`}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="component"
                label="Component"
                type="text"
                fullWidth
                value={formData.component}
                onChange={handleChange}
                error={!!errors.component}
                helperText={errors.component}
              />
            </Grid>

            <Grid
              item
              xs={12}
              gap={1}
              style={{ display: "flex", justifyContent: "right" }}
            >
              <Button variant="contained" color="secondary" onClick={onClose}>
                Close
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {"Submit"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddComponentDialog;
