import React from "react";
import "./Character.css"; // Create and import a CSS file for character styling

const Character = ({ isJumping }) => {
  return (
    <div className={`character ${isJumping ? "jump" : ""}`}>
      <img src="/path-to-your-character-image.png" alt="Character" />
    </div>
  );
};

export default Character;
