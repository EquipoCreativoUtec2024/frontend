'use client';
import React, { useState, useEffect } from 'react';
import { GameCardWrapper } from './_components/GameCardWrapper';
import { Shop } from './_components/_Shop/Shop';
import lockedSymbol from './assets/locked.svg';
import playSymbol from './assets/play.svg';
import padlockSymbol from './assets/padlock.svg';
import './App.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function App() {
  const router = useRouter();
  const userData = Cookies.get('userData');
  if (!userData) {
    router.push('/auth');
  }

  const gameCardsMenu = [
    { color: 'yellow', symbol: playSymbol, prize: "5" },
    { color: 'white', symbol: lockedSymbol, prize: "7" },
    { color: 'white', symbol: lockedSymbol, prize: "10" },
    { color: 'aquamarine', symbol: playSymbol, prize: "4" },
    { color: 'crimson', symbol: playSymbol, prize: "6" },
    { color: 'white', symbol: lockedSymbol, prize: "8" },
    { color: 'white', symbol: lockedSymbol, prize: "9" },
    { color: 'yellowgreen', symbol: playSymbol, prize: "5" },
  ];

  const gameCardsShop = [
    { color: 'white', symbol: playSymbol, prize: "7" },
    { color: 'aquamarine', symbol: padlockSymbol, prize: "4" },
    { color: 'gray', symbol: padlockSymbol, prize: "5" },
    { color: 'white', symbol: playSymbol, prize: "10" },
  ];

  const [currentView, setCurrentView] = useState('gameCardWrapper');
  
  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  useEffect(() => {
    if (currentView === 'gameCardWrapper') {
      document.title = 'Menú | BlackOut In An App';
    } else if (currentView === 'shop') {
      document.title = 'Shop | BlackOut In An App';
    }
  }, [currentView]);
  
  return (
    <>
      {currentView === 'gameCardWrapper' && <GameCardWrapper gameCards={gameCardsMenu} onNavigate={handleNavigate} />}
      {currentView === 'shop' && <Shop gameCards={gameCardsShop} onNavigate={handleNavigate} />}
    </>
  );
}

export default App;