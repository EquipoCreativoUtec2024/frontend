import React from "react";
import profile from "../assets/profile.png";
import bottle from "../assets/beer-bottle.png";
import shop from "../assets/shop.png";
import { GameCard } from "./GameCard";
import Image from "next/image";
import "../App.css";

export interface GameCardWrapperProps {
  gameCards: {
    color: string;
    symbol: string;
    prize: string;
  }[];
  onNavigate: (view: string) => void;
}

export function GameCardWrapper({
  gameCards,
  onNavigate,
}: GameCardWrapperProps) {
  return (
    <>
      <header className="header">
        <div className="person-icon">
          <button className="profile-button">
            <Image src={profile} alt="Ícono de perfil" />
          </button>
        </div>

        <div className="right-section">
          <button className="add-button">+</button>
          <Image src={bottle} alt="Ícono de botella" />
        </div>
      </header>

      <main className="grid-container">
        <div className="grid">
          <GameCard gameCards={gameCards} />
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
