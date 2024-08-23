import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import ErrorBoundary from "./components/common/ErrorBoundary";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
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
