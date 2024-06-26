import React from "react";
import Image from "next/image";
import "../app.css";
import { useRouter } from "next/navigation";
export interface GameCardProps {
  gameCards: GameCardRenderData[],
  isStore: boolean;
}

export interface GameCardRenderData {
  color: string;
  symbol: any;
  price: string;
  pretty_name: string;
  route: string;
}

export const GameCard = ({gameCards, isStore}: GameCardProps ) => {
  const router = useRouter();
  const renderGameCards = () => {
    if (gameCards.length === 0) {
      return null;
    }
    return gameCards.map((card, index) => (
      <button className="prize-button" style={{ backgroundColor: card.color }} onClick={() => {router.push('/games'+card.route)}}>
        <div
          key={index}
          className="card"
          style={{ backgroundColor: card.color }}
        >
          <Image src={card.symbol} alt="Symbol" />
          {isStore ? 
            <h2 className="prize"> {`S/.${card.price}`} </h2>
            : <h2 className="prize"> {card.pretty_name} </h2>
          }
        </div>
      </button>
    ));
  };

  return renderGameCards();
};
