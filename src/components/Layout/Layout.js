import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import {
  Save,
  Restore,
  Share,
  SwapHoriz,
  TableChart,
  PivotTableChart,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Layout.css";

const Layout = ({
  children,
  onSaveView,
  onLoadView,
  onResetView,
  onShareView,
}) => {
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
              color="inherit"
              startIcon={<TableChart />}
            >
              Table View
            </Button>
            <Button
              component={Link}
              to="/pivot"
              color="inherit"
              startIcon={<PivotTableChart />}
            >
              Pivot View
            </Button>
          </Box>
          <Box className="right-actions">
            <IconButton color="inherit" onClick={onSaveView} title="Save View">
              <Save />
            </IconButton>
            <IconButton color="inherit" onClick={onLoadView} title="Load View">
              <Restore />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={onResetView}
              title="Reset View"
            >
              <SwapHoriz />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={onShareView}
              title="Share View"
            >
              <Share />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className="content">{children}</Box>
    </Box>
  );
};

export default Layout;
