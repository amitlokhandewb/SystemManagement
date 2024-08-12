import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForkRef } from "@mui/material";

const GenericDialog = ({
  open,
  onClose,
  onSubmit,
  initialData,
  field1,
  idField,
  label,
}) => {
  const [formData, setFormData] = useState({
    [idField]: idField,
    [field1]: "",
  });

  const [errors, setErrors] = useState({
    [field1]: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        [idField]: initialData[idField] || 0,
        [field1]: initialData[field1],
      });
    }
  }, [initialData, field1, idField]);
  useEffect(() => {
    setFormData({
      [idField]: 0,
      [field1]: "",
    });
  }, [open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: e.target.value.trim() === "",
    });
  };

  const handleSubmit = () => {
    const fieldValue = formData[field1];
    if (typeof fieldValue === "string" && !fieldValue.trim()) {
      setErrors({
        [field1]: true,
      });
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle>
        {idField > 0 ? `Edit ${label}` : `Create ${label}`}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name={field1}
          label={label}
          type="text"
          fullWidth
          value={formData[field1]}
          onChange={handleChange}
          error={errors[field1]}
          helperText={errors[field1] ? `${label} is required.` : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="success" variant="contained">
          {idField > 0 ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
