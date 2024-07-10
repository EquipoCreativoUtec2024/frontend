import React from "react";
import { GameCard, GameCardRenderData } from "./GameCard";
import "../app.css";

export interface GameCardWrapperProps {
  gameCards: GameCardRenderData[];
}

export function GameCardWrapper({
  gameCards,
}: GameCardWrapperProps) {
  return (
    <>
      <main className="grid-container">
        <div className="grid">
          <GameCard gameCards={gameCards} />
        </div>
      </main>
    </>
  );
}
