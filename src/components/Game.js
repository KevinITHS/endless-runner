import React, { useState, useEffect, useCallback } from "react";
import Character from "./Character";
import Obstacle from "./Obstacle";
import "./Game.css";
const backgroundImages = {
  jungle: require("../backgrounds/Jungle.gif"),
  mountain: require("../backgrounds/Mountain.gif"),
  desert: require("../backgrounds/Desert.gif"),
};

const Game = ({ currentMap, setGameState, score, setScore, crabType }) => {
  const [isJumping, setIsJumping] = useState(false);
  const [isInvincible, setIsInvincible] = useState(false);
  const [jumpInProgress, setJumpInProgress] = useState(false);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [obstacleDistance, setObstacleDistance] = useState(100);
  const [spikeDistanceFromPlayer, setSpikeDistanceFromPlayer] = useState(100);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setscreenWidth] = useState(0);

  // const [obstacleType, setObstacleType] = useState(ObstacleImage1);
  const playerPosition = screenWidth * 0.2;

  const spikeMoves = () => {
    setObstacleDistance((currentDistance) => {
      if (currentDistance <= 0) {
        return 100; // when distance is 0 we reset it to 100
      } else {
        return currentDistance - 0.45; // 0.55 is the speed of the obstacle
      }
    });
  };

  // Everytime the spike moves, we check if the player is hit
  useEffect(() => {
    setScore((currentScore) => currentScore + 1);
    if (
      spikeDistanceFromPlayer < playerPosition + 30 &&
      spikeDistanceFromPlayer > playerPosition - 60
    ) {
      if (!isInvincible) {
        setGameState("deathScreen");
      }
    }
    setSpikeDistanceFromPlayer(screenWidth * (obstacleDistance * 0.02));
  }, [obstacleDistance]);

  // This is the gameloop, or better said what makes the spike move
  useEffect(() => {
    const intervalId = setInterval(spikeMoves, 1000 / 60); // Run the gameloop 60 times per second
    return () => clearInterval(intervalId);
  }, []);
  // set the screen width and height on load
  useEffect(() => {
    let gameElement = document.querySelector(".game");
    const width = gameElement.offsetWidth;
    const height = gameElement.offsetHeight;
    setScreenHeight(width);
    setscreenWidth(height);
  }, []);
  // this function handles the jump as well as when the player is invincible
  const handleJump = useCallback(() => {
    if (!isJumping && !jumpInProgress && !isOnCooldown) {
      setIsInvincible(true);
      setJumpInProgress(true);
      setIsJumping(true);
      setIsOnCooldown(true);
      setTimeout(() => {
        setIsJumping(false);
        setTimeout(() => {
          setJumpInProgress(false);
        }, 50);
        setTimeout(() => {
          setIsOnCooldown(false);
          setIsInvincible(false);
        }, 50);
      }, 500);
    }
  }, [isJumping, jumpInProgress, isOnCooldown]);
  // This resets the spike when it has reached the end of the screen
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (obstacleDistance === 0) {
        setObstacleDistance(100);
      }
    }, 3500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        handleJump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleJump]);

  const handleTouchStart = () => {
    handleJump();
  };

  const gameStyle = {
    backgroundImage: `url(${backgroundImages[currentMap]})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  };

  const containerStyle = {
    width: "950px",
    aspectRatio: "16 / 9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const entityPosition = {
    crab: 0.06,
    spike: 0.08,
  };

  const positionCharacter = () => {
    let gameElement = document.querySelector(".game");
    let characterElement = document.querySelector(".character");

    if (gameElement && characterElement) {
      // const gameWidth = gameElement.offsetWidth;
      // const gameHeight = gameElement.offsetHeight;
      // const characterSize = Math.min(gameWidth, gameHeight) * 0.16;
      characterElement.style.width = `${80}px`;
      characterElement.style.height = `${80}px`;
      characterElement.style.bottom = `${screenHeight * entityPosition.crab}px`;
      characterElement.style.left = `${playerPosition}px`;
    }
  };

  useEffect(() => {
    positionCharacter();
    window.addEventListener("resize", positionCharacter);

    return () => {
      window.removeEventListener("resize", positionCharacter);
    };
  }, [currentMap, screenHeight, screenWidth]);

  const currentScoreStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "White",
    fontSize: "14px",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <div style={containerStyle}>
      <div
        style={gameStyle}
        className="game movingBackground"
        onTouchStart={handleTouchStart}
      >
        <div style={currentScoreStyle}>
          <h1>Score: {score}</h1>
        </div>
        <Character isJumping={isJumping} crabType={crabType} />
        <Obstacle
          spikePositionY={entityPosition.spike}
          setObstacleDistance={setObstacleDistance}
          spikeDistanceFromPlayer={spikeDistanceFromPlayer}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
        />
      </div>
    </div>
  );
};

export default Game;
