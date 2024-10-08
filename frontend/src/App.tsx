import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NavBar } from "./components/navbar";

import { Index } from "./pages";
import { Assets } from "./pages/assets";
import { Hos } from "./pages/hos";

export const App = () => {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hos" element={<Hos />} />
          <Route path="/assets" element={<Assets />} />
        </Routes>
      </Router>
    </>
  );
};
