import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NavBar } from "./components/navbar";

import { Index } from "./pages";

export const App = () => {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hos" element={<Index />} />
          <Route path="/assets" element={<Index />} />
        </Routes>
      </Router>
    </>
  );
};
