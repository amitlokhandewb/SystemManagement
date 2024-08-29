import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AddComponent,
  GetRoleMapByDropDownAsync,
} from "../../Services/RoleMappingService";
import { KeyOutlined } from "@mui/icons-material";

const initialData = {
  component: "",
  parentId: "", // Add parentId here
};

function AddComponentDialog({ open, onClose, fetchData }) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({
    component: "",
    parentId: "", // Add parentId error state
  });
  const [dropdown, setDropdown] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchDropdown = async () => {
    try {
      const res = await GetRoleMapByDropDownAsync();
      setDropdown(res);
      console.log("dropdown ", res);
    } catch (error) {}
  };

  const validate = () => {
    let tempErrors = {} as any;
    tempErrors.component = formData.component ? "" : "Component is required.";
    tempErrors.parentId = formData.parentId ? "" : "Parent ID is required."; // Add validation for parentId
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully:", formData);
      const res = AddComponent(formData);
      if (res) {
        setFormData(initialData); // Reset form including parentId
        onClose();
      }
      fetchData();
    }
  };

  useEffect(() => {
    fetchDropdown();
  }, []);

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
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.parentId}>
                <InputLabel id="parent-select-label">Select your Role</InputLabel>
                <Select
                  labelId="parent-select-label"
                  id="parent-select"
                  value={formData.parentId}
                  label="Select your Role"
                  name="parentId"
                  onChange={handleChange}
                >
                  {dropdown.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.pageName}
                    </MenuItem>
                  ))}
                </Select>
                {errors.parentId && (
                  <p style={{ color: "red", marginTop: "8px" }}>
                    {errors.parentId}
                  </p>
                )}
              </FormControl>
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
