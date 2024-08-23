import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import ErrorBoundary from "./components/common/ErrorBoundary";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff9800",
      contrastText: "#fff",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    text: {
      primary: "rgba(0,0,0,0.87)",
      secondary: "rgba(0,0,0,0.54)",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 2,
  },
  spacing: 2,
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <App />
            </Router>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals(sendToVercelAnalytics);
