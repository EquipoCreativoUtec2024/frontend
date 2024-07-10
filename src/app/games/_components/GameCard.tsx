"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import beerIcon from "@/app/assets/beer.png";
import "../app.css";
import { useRouter } from "next/navigation";

export interface GameCardProps {
  gameCards: GameCardRenderData[];
}

export interface GameCardRenderData {
  color: string;
  symbol: any;
  price_real?: string;
  price_in_game_currency?: string;
  pretty_name: string;
  route: string;
  unlocked: boolean;
}

interface handleClickProps {
  card: GameCardRenderData;
  index: number;
}

export const GameCard = ({ gameCards }: GameCardProps) => {
  const router = useRouter();

  const [buyMenuVisibility, setBuyMenuVisibility] = useState<boolean[]>([]);

  useEffect(() => {
    if (gameCards.length === 0) {
      return;
    }
    const buyMenuVisibilityArray = gameCards.map(() => false);
    setBuyMenuVisibility(buyMenuVisibilityArray);
    console.log("Game cards", gameCards);
    console.log("Buy menu visibility", buyMenuVisibilityArray);
  }, [gameCards]);

  const handleClick = ({ card, index }: handleClickProps) => {
    if (card.unlocked) {
      router.push("/games" + card.route);
    } else {
      // Create a new array with updated visibility
      const newBuyMenuVisibility = [...buyMenuVisibility];
      newBuyMenuVisibility[index] = !buyMenuVisibility[index];
      setBuyMenuVisibility(newBuyMenuVisibility);
      console.log("Toggling buy menu", newBuyMenuVisibility);
    }
  };

  const handleCloseBuyMenu = (index: number) => {
    console.log("Closing buy menu", index);
    // Create a new array with the specific menu closed
    const newBuyMenuVisibility = [...buyMenuVisibility];
    newBuyMenuVisibility[index] = false;
    setBuyMenuVisibility(newBuyMenuVisibility);
  };

  const handleBuy = () => {
    console.log("Buy");
  };

  const renderGameCards = () => {
    if (gameCards.length === 0) {
      return null;
    }
    return gameCards.map((card, index) => (
      <button
        className="prize-button"
        style={{ backgroundColor: card.color }}
        onClick={() => handleClick({ card, index })}
      >
        <div
          key={index}
          className="card"
          style={{ backgroundColor: card.color }}
        >
          <Image src={card.symbol} alt="Symbol" />

          <h2 className="prize"> {card.pretty_name} </h2>

          {!card.unlocked ? (
            <h3 className="price">
              {" "}
              S./ {card.price_real} |{" "}
              <Image
                className="h-[1.2em] w-auto inline self-center pb-1"
                src={beerIcon}
                alt="In game currency icon"
              />{" "}
              {card.price_in_game_currency}{" "}
            </h3>
          ) : null}
        </div>
        <div
          className={`absolute flex justify-center items-center top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 cursor-default ${
            buyMenuVisibility[index] === false ? "hidden" : ""
          }`}
        >
          <div
            className="bg-yellow-500 w-[50%] h-[50%] m-auto rounded-lg z-20 flex flex-col justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2 className="text-3xl">Buy {card.pretty_name}?</h2>
            <div>
              <button
                className="bg-green-500 text-white p-2 z-30 rounded-lg m-2 cursor-pointer"
                onClick={handleBuy}
              >
                Buy
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-lg m-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseBuyMenu(index);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </button>
    ));
  };

  return renderGameCards();
};
