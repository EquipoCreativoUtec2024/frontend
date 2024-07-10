"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import beerIcon from "@/app/assets/beer.png";
import "../app.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export interface GameCardProps {
  gameCards: GameCardRenderData[];
}

export interface GameCardRenderData {
  color: string;
  symbol: any;
  price_real?: string;
  price_in_game_currency?: string;
  description?: string
  pretty_name: string;
  route: string;
  unlocked: boolean;
}

interface handleClickProps {
  card: GameCardRenderData;
  index: number;
}

interface handleBuyProps {
  type: number;
  index: number;
  card: GameCardRenderData;
}

export const GameCard = ({ gameCards }: GameCardProps) => {
  const userData = Cookies.get("userData");
  const parsedUserData = JSON.parse(userData ?? "{}");
  const router = useRouter();

  const [buyMenuVisibility, setBuyMenuVisibility] = useState<boolean[]>([]);
  const [buyMenuErrors, setBuyMenuErrors] = useState<string[]>([]);

  useEffect(() => {
    if (gameCards.length === 0) {
      return;
    }
    const buyMenuVisibilityArray = gameCards.map(() => false);
    const buyMenuErrorsArray = gameCards.map(() => "");
    setBuyMenuVisibility(buyMenuVisibilityArray);
    setBuyMenuErrors(buyMenuErrorsArray);
  }, [gameCards]);

  const handleClick = ({ card, index }: handleClickProps) => {
    if (card.unlocked) {
      router.push("/games" + card.route);
    } else {
      const newBuyMenuErrors = [...buyMenuErrors];
      const newBuyMenuVisibility = [...buyMenuVisibility];
      newBuyMenuVisibility[index] = !buyMenuVisibility[index];
      newBuyMenuErrors[index] = "";
      setBuyMenuVisibility(newBuyMenuVisibility);
      setBuyMenuErrors(newBuyMenuErrors);
    }
  };

  const handleCloseBuyMenu = (index: number) => {
    const newBuyMenuVisibility = [...buyMenuVisibility];
    const newBuyMenuErrors = [...buyMenuErrors];
    newBuyMenuVisibility[index] = false;
    newBuyMenuErrors[index] = "";

    setBuyMenuVisibility(newBuyMenuVisibility);
    setBuyMenuErrors(newBuyMenuErrors);
  };

  const handleBuy = ({type, card, index}: handleBuyProps) => {
    if(type === 0) {
      if (card.price_in_game_currency === undefined) {
        const newBuyMenuErrors = [...buyMenuErrors];
        newBuyMenuErrors[index] = "El juego no tiene precio en Beeras";
        setBuyMenuErrors(newBuyMenuErrors);
        return;
      }
      if (parsedUserData.currency["N"] < card.price_in_game_currency) {
        const newBuyMenuErrors = [...buyMenuErrors];
        newBuyMenuErrors[index] = "No tienes suficientes Beeras";
        setBuyMenuErrors(newBuyMenuErrors);
        return;
      }
      const newBuyMenuErrors = [...buyMenuErrors];
      newBuyMenuErrors[index] = "";
      setBuyMenuErrors(newBuyMenuErrors);
      // TODO: Handle buy on back
    } else {
      // Compra con dinero real
      const newBuyMenuErrors = [...buyMenuErrors];
      newBuyMenuErrors[index] = "Esta función aún no está disponible";
      setBuyMenuErrors(newBuyMenuErrors);
    }
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
            className="bg-gradient-to-r from-pink-500 to-yellow-500 aspect-[5/7] h-[60vh] max-w-[90vw] m-auto rounded-lg z-20 flex flex-col justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2 className="text-3xl mb-2">{card.pretty_name}</h2>
            <h3 className="text-xl text-balance mb-4 px-1">{card.description ? card.description : null} </h3>
            <h3 className="price mb-6">
              S./ {card.price_real} | {" "}
              <Image
                className="h-[1.2em] w-auto inline self-center pb-1"
                src={beerIcon}
                alt="In game currency icon"
              />{" "}
              {card.price_in_game_currency}
            </h3>
            <div>
              <button
                className="bg-yellow-500 text-white p-2 z-30 rounded-lg m-2 cursor-pointer hover:bg-yellow-600"
                onClick={() => handleBuy({type: 0, card, index})}
              >
                Usar Beeras
              </button>
              <button
                className="bg-green-500 text-white p-2 z-30 rounded-lg m-2 cursor-pointer hover:bg-green-600"
                onClick={() => handleBuy({type: 1, card, index})}
              >
                Usar Soles
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-lg m-2 cursor-pointer hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseBuyMenu(index);
                }}
              >
                Cancelar
              </button>
            </div>
            <p className="text-red-900 h-0 overflow-visible">{buyMenuErrors[index]}</p>
          </div>
        </div>
      </button>
    ));
  };

  return renderGameCards();
};
