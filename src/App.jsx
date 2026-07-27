//import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Landing from './pages/Landing';
import Result from "./pages/Result";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/result" element={<Result />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
}