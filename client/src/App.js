// client/src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BooksAdmin from "./pages/BooksAdmin";

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "1.5rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/books/admin" element={<BooksAdmin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
