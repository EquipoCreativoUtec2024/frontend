"use client";
import React, { useEffect, useState } from "react";
import PlayerWaiting from "./_components/playerWaiting";

export enum gameStates {
  "waiting",
  "playing",
  "starting",
  "done",
}

export default function faceoff() {
  const [gameState, setGameState] = useState(gameStates.waiting);
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [playerTwoReady, setPlayerTwoReady] = useState(false);

  useEffect(() => {
    if (playerOneReady && playerTwoReady) {
      setGameState(gameStates.starting);
    }
  }, [playerOneReady, playerTwoReady]);

  switch (gameState) {
    case gameStates.waiting:
    case gameStates.starting:
      return (
        <div className="flex flex-col justify-end items-center h-[100vh]">
          <PlayerWaiting currentGameState={gameState} setReady={setPlayerOneReady} ready={playerOneReady} topPlayer={true}/>
          <PlayerWaiting currentGameState={gameState} setReady={setPlayerTwoReady} ready={playerTwoReady} topPlayer={false}/>
        </div>
      );
    case gameStates.playing:
      return (
        <div>
          <h1>Playing</h1>
        </div>
      );
    case gameStates.done:
      return (
        <div>
          <h1>Done</h1>
        </div>
      );
  }
}
