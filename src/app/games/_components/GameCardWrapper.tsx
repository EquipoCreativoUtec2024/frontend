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
  isStore: boolean;
  onNavigate: (view: string) => void;
}

export function GameCardWrapper({
  gameCards,
  onNavigate,
  isStore,
}: GameCardWrapperProps) {
  return (
    <>
      <main className="grid-container">
        <div className="grid">
          <GameCard gameCards={gameCards} isStore={isStore}/>
        </div>
      </main>

      <footer className="footer">
        <Image src={shop} alt="Ícono de tienda" className="shop-icon" />
        <button className="shop-button" onClick={() => onNavigate("shop")}>
          {" "}
          Shop{" "}
        </button>
      </footer>
    </>
  );
}
