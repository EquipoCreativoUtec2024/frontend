"use client";
import React, { useState, useEffect } from "react";
import { GameCardWrapper } from "./_components/GameCardWrapper";
import lockedSymbol from "./assets/locked.svg";
import playSymbol from "./assets/play.svg";
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
  const [currency, setCurrency] = useState<number>(0);
  const [gamesData, setGamesData] = useState<FetchDataGames[]>([]);
  const [storeData, setStoreData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allGames, setAllGames] = useState<GameCardRenderData[]>([]);
  const [profileMenuVisibility, setProfileMenuVisibility] = useState(false);

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
        setStoreData(data);
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
        parsedUserData.currency = { N: data["currency"] };
        Cookies.set("userData", JSON.stringify(parsedUserData));
      });
  }, []);

  useEffect(() => {
    if (gamesData.length === 0 || userData === undefined || storeData === undefined || storeData.length === 0) {
      return;
    }

    const gameCardsMenu: GameCardRenderData[] = gamesData.map((game) => {
      if (parsedUserData.owned_games.SS.includes(game.id)) {
        return {
          color: game.color,
          symbol: playSymbol,
          pretty_name: game.pretty_name,
          route: game.route,
          unlocked: true,
        };
      } else {
        const gameStoreData = storeData.find((storeItem) => storeItem.item_name === game.id) as any;
        return {
          color: game.color,
          symbol: lockedSymbol,
          price_real: gameStoreData?.cost_real,
          price_in_game_currency: gameStoreData?.cost_in_game,
          description: gameStoreData?.description['S'],
          pretty_name: game.pretty_name,
          route: "",
          unlocked: false,
        };
      }
    });
    setAllGames(gameCardsMenu);
  }, [gamesData]);

  useEffect(() => {
    setCurrency(parsedUserData.currency["N"]);
  }, [parsedUserData]);

  const profileMenuToggle = () => {
    setProfileMenuVisibility(!profileMenuVisibility);
  };

  const handleLogOut = () => {
    Cookies.remove("userData");
    router.push("/auth");
  };

  const handleModifyUser = () => {
    router.push("/auth/editUser");
  };

  if (!parsedUserData || parsedUserData === undefined) {
    return <></>;
  }

  return (
    <>
      <header className="header">
        <div className="person-icon">
          <button className="profile-button" onClick={profileMenuToggle}>
            <Image src={profile} alt="Ícono de perfil" />
          </button>
          {profileMenuVisibility && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-black shadow-md rounded-lg z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-slate-900 rounded-lg " onClick={handleModifyUser}>
                Modificar perfil
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-slate-900 rounded-lg "
                onClick={handleLogOut}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>

        <div className="right-section">
          <button className="add-button">+</button>
          {currency}{" "}
          <Image src={bottle} alt="Ícono de botella" />
        </div>
      </header>

      <GameCardWrapper
        gameCards={allGames}
      />
    </>
  );
}

export default App;
