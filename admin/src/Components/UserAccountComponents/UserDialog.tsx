import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import CreateNewUser from "./CreateNewUser";

function UserDialog({ open, id ,handleClose,fetchData}) {
  return (
    <Dialog open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle>{id > 0 ? `Update User ` : `Create User`}</DialogTitle>
      <DialogContent>
        <CreateNewUser userId={id} handleClose={handleClose} fetchData={fetchData}  />
      </DialogContent>
    </Dialog>
  );
}

export default UserDialog;
