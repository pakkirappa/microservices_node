import React, { useState } from "react";
import "./App.css";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div
      className={
        darkTheme
          ? "bg-dark text-white min-vh-100"
          : "bg-light text-dark min-vh-100"
      }
    >
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Blog App</h1>
          <button className="btn btn-outline-primary" onClick={toggleTheme}>
            {darkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
          </button>
        </div>
        <PostCreate />
        <hr className={darkTheme ? "border-light" : "border-dark"} />
        <PostList />
      </div>
    </div>
  );
}

export default App;
