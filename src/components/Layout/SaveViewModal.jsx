import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const SaveViewModal = ({ open, onClose, onConfirm }) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    onConfirm(name);
    onClose();
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save View</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="View Name"
          type="text"
          fullWidth
          value={name}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveViewModal;
