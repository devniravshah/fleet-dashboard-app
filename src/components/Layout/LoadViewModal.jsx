import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";

const LoadViewModal = ({ open, onClose, onConfirm, savedViews }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const handleLoad = () => {
    if (selectedIndex >= 0) {
      onConfirm(selectedIndex);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Load View</DialogTitle>
      <DialogContent>
        {savedViews.length === 0 ? (
          <Typography variant="body1" align="center">
            No saved views found.
          </Typography>
        ) : (
          <List>
            {savedViews.map((view, index) => (
              <ListItem
                key={index}
                button
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
              >
                <ListItemText primary={view.name} secondary={view.time} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLoad}>Load</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadViewModal;
