"use client";
import React, { useState, useEffect } from "react";

export interface CardData {
  question: string;
  likes: number;
  dislikes: number;
  author: string;
  type: string;
  id: number;
}

function Card({ question, likes, dislikes, author, type }: CardData) {
  const getCardBackgorund = (type: string) => {
    switch (type) {
      case "question":
        return "bg-blue-200";
      case "challenge":
        return "bg-red-400";
      default:
        return "bg-purple-200";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "question":
        return "Pregunta";
      case "challenge":
        return "Reto";
      default:
        return type;
    }
  }

  return (
    <div
      className={`aspect-[5/7] h-[60vh] max-w-[90vw] rounded-lg my-8 ${getCardBackgorund(
        type
      )}`}
    >
      <div className="flex flex-col justify-between h-full p-4">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">{question}</h1>
          <div className="flex justify-between w-14 bg-black bg-opacity-10 rounded-xl h-6 mt-2">
            <button className="mx-2 text-green-400">{likes}</button>
            <button className="mx-2 text-red-700">{dislikes}</button>
          </div>
        </div>
        <div className="flex justify-between">
            <p>{getTypeText(type)}</p>
          <p>{author}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
