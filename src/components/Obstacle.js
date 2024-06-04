import React, { useEffect } from "react";
import spikeImg from "../img/spike2.png";

const Obstacle = ({
  spikeDistanceFromPlayer,
  spikePositionY,
  screenHeight,
}) => {
  // THIS LOGIC MOVES THE SPIKE EVERY FRAME

  const obstacleStyle = {
    position: "absolute",
    bottom: `${screenHeight * spikePositionY}px`,
    height: "20px",
    width: "50px",
  };

  const imageStyle = {
    width: "100%",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      style={{
        ...obstacleStyle,
        left: `${spikeDistanceFromPlayer}px`,
      }}
      className="spike"
    >
      <img src={spikeImg} style={imageStyle} alt="Spike" />
    </div>
  );
};

export default Obstacle;
