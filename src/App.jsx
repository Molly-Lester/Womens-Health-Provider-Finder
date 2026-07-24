import { Loader, Center } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import "./App.css";

import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  const loading = useSelector((state) => state.search.loading);

  return (
    <>
      {loading && (
        <Center
          style={{
            position: "fixed",
            inset: 0,
            background: "white",
            zIndex: 9999,
            flexDirection: "column",
          }}
        >
          <Loader size="lg" />
          <p>Finding providers...</p>
        </Center>
      )}

      <Notifications position="top-right" />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/results"
          element={<ResultsPage />}
        />
      </Routes>
    </>
  );
}

