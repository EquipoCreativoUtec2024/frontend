"use client";
import React, { useState, useEffect } from "react";
import { GameCardWrapper } from "./_components/GameCardWrapper";
import { Shop } from "./_components/_Shop/Shop";
import lockedSymbol from "./assets/locked.svg";
import playSymbol from "./assets/play.svg";
import padlockSymbol from "./assets/padlock.svg";
import "./app.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { GameCardRenderData } from "./_components/GameCard";
import Image from "next/image";
import profile from "./assets/profile.png";
import bottle from "./assets/beer-bottle.png";

export interface FetchDataGames {
  id: string;
  pretty_name: string;
  route: string;
  color: string;
}

export function App() {
  const router = useRouter();
  const userData = Cookies.get("userData");
  const parsedUserData = JSON.parse(userData ?? "{}");
  const [gamesData, setGamesData] = useState<FetchDataGames[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gamesCardMenu, setGamesCardMenu] = useState<GameCardRenderData[]>([]);
  const [gamesCardShop, setGamesCardShop] = useState<GameCardRenderData[]>([]);

  if (!userData) {
    router.push("/auth");
  }

  useEffect(() => {
    if (!userData) {
      router.push("/auth");
    }
    fetch("https://8zpbnlo7dd.execute-api.us-east-1.amazonaws.com/dev/game", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGamesData(data);
        setIsLoading(false);
      });
    fetch("https://8zpbnlo7dd.execute-api.us-east-1.amazonaws.com/dev/store", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGamesCardShop(data);
        console.log("Store Data", data);
      });
    fetch(
      "https://8zpbnlo7dd.execute-api.us-east-1.amazonaws.com/dev/user/currency?username=" +
        parsedUserData.username["S"],
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Currency Data", data);
        parsedUserData.currency = {"N": data["currency"]};
        Cookies.set("userData", JSON.stringify(parsedUserData));
        console.log(parsedUserData);
      });
  }, []);

  useEffect(() => {
    if (gamesData.length === 0 || userData === undefined) {
      return;
    }

    const gameCardsMenu: GameCardRenderData[] = gamesData.map((game) => {
      if (parsedUserData.owned_games.SS.includes(game.id)) {
        return {
          color: game.color,
          symbol: playSymbol,
          price: "5",
          pretty_name: game.pretty_name,
          route: game.route,
        };
      } else {
        return {
          color: game.color,
          symbol: lockedSymbol,
          price: "7",
          pretty_name: game.pretty_name,
          route: game.route,
        };
      }
    });
    setGamesCardMenu(gameCardsMenu);
  }, [gamesData]);

  const gameCardsShop = [
    { color: "white", symbol: playSymbol, price: "7" },
    { color: "aquamarine", symbol: padlockSymbol, price: "4" },
    { color: "gray", symbol: padlockSymbol, price: "5" },
    { color: "white", symbol: playSymbol, price: "10" },
  ];

  const [currentView, setCurrentView] = useState("gameCardWrapper");

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  useEffect(() => {
    if (currentView === "gameCardWrapper") {
      document.title = "Menú | BlackOut In An App";
    } else if (currentView === "shop") {
      document.title = "Shop | BlackOut In An App";
    }
  }, [currentView]);

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
          {parsedUserData.currency["N"]}{" "}
          <Image src={bottle} alt="Ícono de botella" />
        </div>
      </header>
      
      {currentView === "gameCardWrapper" && (
        <GameCardWrapper
          gameCards={gamesCardMenu}
          isStore={false}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === "shop" && (
        <Shop gameCards={gameCardsShop} onNavigate={handleNavigate} />
      )}
    </>
  );
}

export default App;
