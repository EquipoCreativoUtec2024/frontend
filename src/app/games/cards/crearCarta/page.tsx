"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

function cardCreation() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("");
  const [customType, setCustomType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const userData = JSON.parse(Cookies.get("userData") ?? "{}");

  const handleCreateCard = () => {
    if (!prompt || !type) {
      setError("Completa todos los campos");
      return;
    }
    if (type === "other" && !customType) {
      setError("Especifica el tipo de carta");
      return;
    }
    setError("");
    setLoading(true);
    try {
      fetch("https://e628hdshuc.execute-api.us-east-1.amazonaws.com/dev/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username["S"],
        }),
      });
      fetch(
        "http://52.203.44.132:5000/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            author: userData.username["S"],
            question: prompt,
            type: type === "other" ? customType : type,
          }),
        }
      ).then((response) => {
        setLoading(false);
        if (response.ok) {
          router.push("/games/cards");
        } else {
          console.log("Error");
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <h1 className="font-bold text-xl mb-4 scale-150">Crea tu pregunta</h1>
      <a className="mb-8 text-center">
        Su carta puede ser una pregunta, un reto, etc. 
        ¡Sé creativo!
      </a>
      <input
        type="text"
        className="p-4 text-lg w-3/4 max-w-xl text-black rounded-full bg-white"
        placeholder="Texto de la carta"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex">
        <select
          className="p-4 pr-2 w-40 text-lg text-black rounded-full mt-4 mx-4 bg-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundImage: `url(https://www.svgrepo.com/show/486227/down-arrow-backup-2.svg)`,
            backgroundPosition: "right 1.5rem center",
            backgroundSize: "1.5em",
            backgroundRepeat: "no-repeat",
          }}
        >
          <option value="">Tipo</option>
          <option value="question">Pregunta</option>
          <option value="challenge">Reto</option>
          <option value="other">Otro</option>
        </select>
        {type === "other" && (
          <input 
            type="text"
            className="p-4 text-lg w-3/4 max-w-xl text-black rounded-full mt-4 mx-4"
            placeholder="Especifica"
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
          />
        )}
      </div>

      {loading ? (
        <div className="animate-spin border-x-2 border-b-2 border-yellow-500 rounded-full h-10 w-10 my-8"></div>
      ) : (
        <>
        <button
          onClick={handleCreateCard}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mt-8"
        >
          Crear
        </button>
        <Link className="mt-2 text-gray-400 hover:text-gray-700" href={'/games/cards'}>Volver</Link>
        </>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default cardCreation;
