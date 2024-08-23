import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="background.default"
        >
          <Paper
            elevation={3}
            sx={{ padding: 4, textAlign: "center", maxWidth: 400 }}
          >
            <ErrorOutlineIcon color="error" sx={{ fontSize: 50 }} />
            <Typography variant="h5" component="h1" gutterBottom>
              Oops! Something went wrong.
            </Typography>
            <Typography variant="body1" gutterBottom>
              An unexpected error has occurred. Please try reloading the page.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleReload}
            >
              Reload Page
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
