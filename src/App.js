import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import TableView from "./components/TableView/TableView";
import PivotView from "./components/PivotView/PivotView"; // Placeholder for now

function App() {
  const handleSaveView = () => {
    // Logic to save the current view
  };

  const handleLoadView = () => {
    // Logic to load a saved view
  };

  const handleResetView = () => {
    // Logic to reset to the default view
  };

  const handleShareView = () => {
    // Logic to share the current view
  };

  return (
    <Layout
      onSaveView={handleSaveView}
      onLoadView={handleLoadView}
      onResetView={handleResetView}
      onShareView={handleShareView}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/table" />} />
        <Route path="/table" element={<TableView />} />
        <Route path="/pivot" element={<PivotView />} />
      </Routes>
    </Layout>
  );
}

export default App;
