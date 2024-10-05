import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NavBar } from "./components/navbar";

import { Index } from "./pages";
import { Assets } from "./pages/assets";

export const App = () => {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hos" element={<Index />} />
          <Route path="/assets" element={<Assets />} />
        </Routes>
      </Router>
    </>
  );
};
