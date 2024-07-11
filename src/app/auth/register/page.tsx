"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@app/assets/logo-text-and-beer.png";
import Link from "next/link";

export default function login() {
  const registerURL =
    "https://e628hdshuc.execute-api.us-east-1.amazonaws.com/dev/user";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegisterClick = () => {
    if (username === "" || password === "") {
      setError("Por favor ingrese un usuario y contraseña.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    setLoading(true);
    // Query is post. Data is contained in the body
    fetch(registerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          setError("");
          response.json().then((data) => {
            window.location.href = "/auth/login";
          });
        } else if (response.status === 400) {
          setError("El usuario ya existe.");
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

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
              onClick={() => handleRegisterClick()}
            >
              Registrarse
            </button>
          </>
        )}
        <Link
          href="/auth/login"
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
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  );
}
