import React, { useEffect, useState } from "react";
import Game from "./components/Game";
import "./App.css";

import character1 from "./img/character1.png";
import character2 from "./img/character2.png";

const maps = [
  {
    level: "desert",
    score: 0,
    className: "desert-button",
  },
  {
    level: "mountain",
    score: 500,
    className: "mountain-button",
  },
  {
    level: "jungle",
    score: 1000,
    className: "jungle-button",
  },
];

const crabs = [
  {
    crab: "red",
    score: 0,
    className: "red-crab-button",
  },
  {
    crab: "blue",
    score: 400,
    className: "blue-crab-button",
  },
  {
    crab: "gold",
    score: 800,
    className: "gold-crab-button",
  },
];

function App() {
  const [gameState, setGameState] = useState("menu");
  const [currentMap, setCurrentMap] = useState(null);
  const [crabType, setCrabType] = useState(null);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isGameReady, setIsGameReady] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle starting the game
  const startGame = () => {
    if (isGameReady) {
      setGameState("game");
    }
  };

  useEffect(() => {
    if (gameState === "game") {
      setScore(0);
    }

    if (gameState === "deathScreen") {
      setTotalScore((currentTotalScore) => currentTotalScore + score);
    }
  }, [gameState]);

  useEffect(() => {
    // Check if both map and crab are chosen
    if (currentMap && crabType) {
      setIsGameReady(true);
      setMessage("");
    } else if (currentMap && !crabType) {
      setMessage("DON'T FORGET THE CRAB!");
      setIsGameReady(false);
    } else if (!currentMap && crabType) {
      setMessage("DON'T FORGET THE MAP!");
      setIsGameReady(false);
    } else {
      setMessage("CHOOSE A MAP AND A CRAB TO START THE GAME!");
      setIsGameReady(false);
    }
  }, [currentMap, crabType]);

  return (
    <div className="App">
      <img src={character1} alt="Character 1" className="character1" />
      <img src={character2} alt="Character 2" className="character2" />

      {gameState === "menu" || gameState === "deathScreen" ? (
        <div className="menu">
          <h1 className="title">Crab Runner</h1>
          <h2 className="total-score">Total Score: {totalScore}</h2>

          <div className="button-label-row">
            <h2 className="button-label">MAP:</h2>
          </div>
          <div className="button-row">
            {maps.map((map) => (
              <div key={map.level} className="menu-item">
                <button
                  className={`menu-button ${map.className} ${
                    currentMap === map.level ? "selected" : ""
                  }`}
                  disabled={!(map.level === "desert") && map.score > totalScore}
                  onClick={() => {
                    setCurrentMap(currentMap === map.level ? null : map.level);
                  }}
                >
                  {map.level}
                </button>
                {map.level !== "desert" && map.score > totalScore && (
                  <div className="unlock-message">
                    {map.score} TO UNLOCK LEVEL
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="button-label-row">
            <h2 className="button-label">CRAB:</h2>
          </div>
          <div className="button-row">
            {crabs.map((crab) => (
              <div key={crab.crab} className="menu-item">
                <button
                  className={`menu-button ${crab.className} ${
                    crabType === crab.crab ? "selected" : ""
                  }`}
                  disabled={!(crab.crab === "red") && crab.score > totalScore}
                  onClick={() => {
                    setCrabType(crabType === crab.crab ? null : crab.crab);
                  }}
                >
                  {crab.crab}
                </button>
                {crab.crab !== "red" && crab.score > totalScore && (
                  <div className="unlock-message">
                    {crab.score} TO UNLOCK CRAB
                  </div>
                )}
              </div>
            ))}
          </div>

          {gameState === "deathScreen" && (
            <div className="death-screen">
              <h1 className="game-over">GAME OVER</h1>
              <h2 className="score-message">YOUR SCORE IS {score}</h2>
            </div>
          )}

          <button
            className={`start-button ${isGameReady ? "" : "disabled"}`}
            onClick={startGame}
            disabled={!isGameReady}
          >
            Start Game
          </button>
          {!isGameReady && (
            <div className="start-unlock-message">{message}</div>
          )}
        </div>
      ) : (
        <Game
          setGameState={setGameState}
          currentMap={currentMap}
          score={score}
          setScore={setScore}
          crabType={crabType}
        />
      )}
    </div>
  );
}

export default App;
