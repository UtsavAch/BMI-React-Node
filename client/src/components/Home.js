import React from "react";
import "../styles/Home.css";
import NavButton from "../components/NavButton";

function HomePage() {
  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="nav-container">
        <NavButton text="Calculator" target="/calculator" />
        <NavButton text="IMC" target="/imc" />
      </div>
    </div>
  );
}

export default HomePage;
