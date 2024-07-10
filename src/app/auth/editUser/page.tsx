"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@app/assets/logo-text-and-beer.png";
import Link from "next/link";
import Cookies from "js-cookie";

export default function editUser() {
  const parsedUserData = JSON.parse(Cookies.get("userData") ?? "{}");
  const changPasswordURL =
    "https://8zpbnlo7dd.execute-api.us-east-1.amazonaws.com/dev/password";
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegisterClick = () => {
    if (parsedUserData?.username === "" || parsedUserData?.username === undefined || parsedUserData === undefined) {
      setError("Por favor inicie sesión antes de cambiar la contraseña.");
      return;
    }
    if (oldPassword === "" || newPassword === "") {
      setError("Por favor ingrese todos los campos.");
      return;
    }
    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    setLoading(true);
    fetch(changPasswordURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: parsedUserData.username["S"],
        old_password: oldPassword,
        new_password: newPassword,
      }),
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          setError("");
          response.json().then((data) => {
            Cookies.remove("userData");
            window.location.href = "/auth/login";
          });
        } else if (response.status === 400) {
          setError("La contraseña antigua es incorrecta.");
        } else {
          setError("La contraseña antigua ingresada es incorrecta.");
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
      <div className="flex justify-center items-center flex-col mt-8 w-[50%] lg:w-[30%] xl:w-[25%] 2xl:w-[20%]">
        <input
          type="password"
          placeholder="Old Password"
          className="border-2 border-gray-500 rounded-md p-2 w-full text-black"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="border-2 border-gray-500 rounded-md p-2 w-full mt-4 text-black"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
              Cambiar Contraseña
            </button>
          </>
        )}
        <Link
          href="/games"
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
          Regresar
        </Link>
      </div>
    </div>
  );
}
