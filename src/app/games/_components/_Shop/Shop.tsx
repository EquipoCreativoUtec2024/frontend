import React from 'react';
import '../../app.css'
import dolar from '../../assets/dolar.svg'
import outline from '../../assets/abajo.png'
import bottle from '../../assets/beer-bottle.png'
import profile from '../../assets/profile.png'
import Image from 'next/image'

import { GameCard } from '../GameCard';
import { GameCardRenderData } from '../GameCard';

export interface ShopProps {
    gameCards: GameCardRenderData[];
    onNavigate: (view: string) => void;
    }

export function Shop({ gameCards, onNavigate }: ShopProps) {
  return (
    <>
      <div className="unlock-all">
        <Image src={dolar} alt="Ícono de dolar" className='dolar-icon' />
        <div className="unlock-text">
          <span> Unlock all </span>
          <span> games </span>
        </div>
      </div>

      <main className="grid-container">
        <div className="grid">
          <GameCard gameCards={gameCards} isStore={true}/>
        </div>
      </main>

      <footer className="footer">
        <div className='content-icon-footer'>
          <Image src={outline} alt="Ícono abajo" className='outline-icon' />
        </div>
        <button className="menu-button" onClick={() => onNavigate('gameCardWrapper')}> Menu </button>
      </footer>
    </>
  );
}