import React from "react";
import profile from "../assets/profile.png";
import bottle from "../assets/beer-bottle.png";
import shop from "../assets/shop.png";
import { GameCard, GameCardRenderData } from "./GameCard";
import Image from "next/image";
import "../app.css";

import { GameCardProps } from "./GameCard";

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
