import { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import "./App.css"

import HomePage from "./pages/HomePage"
import ResultsPage from "./pages/ResultsPage"

export default function App() {
  const [searchData, setSearchData] = useState(null);

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage setSearchData={setSearchData} />}
      />
      <Route
        path="/results"
        element={<ResultsPage searchData={searchData} />}
      />
    </Routes>
  );
}

