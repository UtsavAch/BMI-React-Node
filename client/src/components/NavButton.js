// src/components/NavButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavButton.css";

function NavButton({ text, target }) {
  const navigate = useNavigate();

  return (
    <button
      className="nav-button"
      onClick={() => {
        navigate(target);
      }}
    >
      {text}
    </button>
  );
}

export default NavButton;
