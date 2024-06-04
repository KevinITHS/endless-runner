import React from "react";
import "./Character.css";

const crabImages = {
  red: require("../img/character1.png"),
  blue: require("../img/character2.png"),
  gold: require("../img/character3.png"),
};
{
  /* <a href="https://www.vecteezy.com/free-png/crab">Crab PNGs by Vecteezy</a> */
}

const Character = ({ isJumping, crabType }) => {
  return (
    <div className={`character ${isJumping ? "jumping" : ""}`}>
      <img src={crabImages[crabType]} alt="Character" />
    </div>
  );
};

export default Character;
