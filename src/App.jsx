import { useState } from "react";
import { Loader, Center } from "@mantine/core";
import { Routes, Route } from 'react-router-dom'
import "./App.css"

import HomePage from "./pages/HomePage"
import ResultsPage from "./pages/ResultsPage"

export default function App() {
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false)

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
          <p>Finding clinics...</p>
        </Center>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              setSearchData={setSearchData}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/results"
          element={<ResultsPage searchData={searchData} />}
        />
      </Routes>
    </>
  );
}

