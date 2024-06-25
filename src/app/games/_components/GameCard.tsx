import React from "react";
import Image from "next/image";
import "../App.css";

export interface GameCardProps {
  gameCards: {
    color: string;
    symbol: string;
    prize: string;
  }[];
}

export const GameCard = ({gameCards}: GameCardProps ) => {
  const renderGameCards = () => {
    return gameCards.map((card, index) => (
      <button className="prize-button" style={{ backgroundColor: card.color }}>
        <div
          key={index}
          className="card"
          style={{ backgroundColor: card.color }}
        >
          <Image src={card.symbol} alt="Symbol" />
          <h2 className="prize"> {`S/.${card.prize}`} </h2>
        </div>
      </button>
    ));
  };

  return renderGameCards();
};
