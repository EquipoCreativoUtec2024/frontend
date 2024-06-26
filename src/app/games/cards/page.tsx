"use client";
import React from "react";
import Link from "next/link";

function cardsLanding() {
  return (
    <div className="flex justify-center items-center h-[100vh] flex-col">
      <h1 className="font-bold text-xl mb-12 scale-150">Canas</h1>
      <div>
        <Link
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mx-4"
          href="/games/cards/jugar"
        >
          Jugar
        </Link>
        <Link
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mx-4"
          href="/games/cards/crearCarta"
        >
          Crear
        </Link>
      </div>
      <Link
        className="hover:text-gray-700 text-gray-500 font-bold py-2 px-4 rounded-full mt-8"
        href={"/games"}
      >
        Volver
      </Link>
    </div>
  );
}

export default cardsLanding;
