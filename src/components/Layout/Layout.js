import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import {
  Save,
  Restore,
  Share,
  TableChart,
  PivotTableChart,
} from "@mui/icons-material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { Link, useLocation } from "react-router-dom";
import "./Layout.css";
import SaveViewModal from "./SaveViewModal";
import LoadViewModal from "./LoadViewModal";

const Layout = ({ children }) => {
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openLoadModal, setOpenLoadModal] = useState(false);
  const [savedViews, setSavedViews] = useState(
    JSON.parse(localStorage.getItem("savedViews")) || []
  );
  const { pathname } = useLocation();

  const handleSaveView = () => {
    setOpenSaveModal(true);
  };

  const handleSaveViewConfirm = (name) => {
    const newSavedView = {
      name,
      url: window.location.href,
      time: new Date().toLocaleString(),
    };
    setSavedViews((prev) => [...prev, newSavedView]);
    localStorage.setItem("savedViews", JSON.stringify(savedViews));
    setOpenSaveModal(false);
  };

  const handleLoadView = () => {
    setOpenLoadModal(true);
  };

  const handleLoadViewConfirm = (index) => {
    const selectedView = savedViews[index];
    window.location.href = selectedView.url;
    setOpenLoadModal(false);
  };

  const handleResetView = () => {
    window.history.pushState({}, "", pathname);
  };

  const handleShareView = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Box className="layout-root">
      <AppBar position="static" className="app-bar">
        <Toolbar className="toolbar">
          <Typography variant="h6" className="title">
            Fleet Dashboard App
          </Typography>
          <Box className="left-actions">
            <Button
              component={Link}
              to="/table"
              sx={{
                background: pathname === "/table" ? "#ff9800" : "#1976d2",
                color: "#fff",
              }}
              startIcon={<TableChart />}
            >
              Table View
            </Button>
            <Button
              component={Link}
              to="/pivot"
              sx={{
                background: pathname === "/pivot" ? "#ff9800" : "#1976d2",
                color: "#fff",
              }}
              startIcon={<PivotTableChart />}
            >
              Pivot View
            </Button>
          </Box>
          <Box className="right-actions">
            <Button
              color="inherit"
              onClick={handleSaveView}
              title="Save View"
              endIcon={<Save />}
            >
              <Typography variant="body1" mr={1}>
                Save
              </Typography>
            </Button>
            <Button
              color="inherit"
              onClick={handleLoadView}
              title="Load View"
              endIcon={<ViewInArIcon />}
            >
              <Typography variant="body1" mr={1}>
                Load
              </Typography>
            </Button>
            <Button
              color="inherit"
              onClick={handleResetView}
              title="Reset View"
              endIcon={<Restore />}
            >
              <Typography variant="body1" mr={1}>
                Reset
              </Typography>
            </Button>
            <Button
              color="inherit"
              onClick={handleShareView}
              title="Share View"
              endIcon={<Share />}
            >
              <Typography variant="body1" mr={1}>
                Share
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className="content">{children}</Box>
      {openSaveModal && (
        <SaveViewModal
          open={openSaveModal}
          onClose={() => setOpenSaveModal(false)}
          onConfirm={handleSaveViewConfirm}
        />
      )}
      {openLoadModal && (
        <LoadViewModal
          open={openLoadModal}
          onClose={() => setOpenLoadModal(false)}
          onConfirm={handleLoadViewConfirm}
          savedViews={savedViews}
        />
      )}
    </Box>
  );
};

export default Layout;
