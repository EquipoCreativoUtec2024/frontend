"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../logo-text-and-beer.png";
import cookies from "js-cookie";
import Link from "next/link";

export default function login() {
  const loginURL =
    "https://8zpbnlo7dd.execute-api.us-east-1.amazonaws.com/dev/user";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginClick = () => {
    setLoading(true);
    try {
      fetch(
        loginURL +
          "?" +
          "username=" +
          username +
          "&" +
          "password=" +
          [password],
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        setLoading(false);
        if (response.ok) {
          setError("");
          response.json().then((data) => {
            cookies.set("userData", JSON.stringify(data));
            window.location.href = "/";
          });
        } else if (response.status === 400) {
          setError("La contraseña ingresada no es correcta.");
        } else if (response.status === 500) {
          setError("El usuario que ingresó no existe.");
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
    <div className="flex justify-center items-center h-[100vh] flex-col">
      <Image src={logo} alt="Logo" width={200} height={200} className="block" />
      <div className="flex justify-center items-center flex-col mt-8 w-[30%] lg:w-[20%] xl:w-[15%] 2xl:w-[10%]">
        <input
          type="text"
          placeholder="Username"
          className="border-2 border-gray-500 rounded-md p-2 w-full text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-gray-500 rounded-md p-2 w-full mt-4 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? (
          <div className="animate-spin border-x-2 border-b-2 border-yellow-500 rounded-full h-10 w-10 mt-4"></div>
        ) : (
          <>
            {error !== "" && <p className="text-red-500 pt-2">{error}</p>}
            <button
              className="block 
          text-white
          hover:bg-yellow-600
          bg-yellow-500
          font-bold 
          py-2 
          px-4 
          rounded
          mt-4
          w-full
          text-center"
              onClick={() => handleLoginClick()}
            >
              Login
            </button>
          </>
        )}
        <Link
          href="/auth/register"
          className="block 
          text-gray-500
          font-bold 
          py-2 
          px-4 
          rounded
          mt-4
          w-full
          text-center"
        >
          ¿No tiene cuenta? Regístrese aquí
        </Link>
      </div>
    </div>
  );
}
