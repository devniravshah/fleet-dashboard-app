import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import TableView from "./components/TableView/TableView";
import PivotView from "./components/PivotView/PivotView"; // Placeholder for now

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/table" />} />
        <Route path="/table" element={<TableView />} />
        <Route path="/pivot" element={<PivotView />} />
      </Routes>
    </Layout>
  );
}

export default App;
