import React, { useState, useEffect } from "react";
import Character from "./Character";
import "./Game.css"; // Create and import a CSS file for game styling

const Game = () => {
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const handleJump = (e) => {
      if (e.code === "Space") {
        setIsJumping(true);
        setTimeout(() => {
          setIsJumping(false);
        }, 500); // Adjust the duration of the jump as needed
      }
    };

    window.addEventListener("keydown", handleJump);

    return () => {
      window.removeEventListener("keydown", handleJump);
    };
  }, []);

  return (
    <div className="game">
      <Character isJumping={isJumping} />
      {/* Add more game elements here like obstacles, ground, etc. */}
    </div>
  );
};

export default Game;
