import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate("/forecast/");
  };
  const handleClickAgain = (id) => {
    navigate("/");
  };
  return (
    <div className="header">
      <button onClick={handleClickAgain}>Weather</button>

      <button onClick={handleClick}>Forecast</button>
    </div>
  );
}
