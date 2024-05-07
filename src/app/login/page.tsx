import React from "react";
import Image from "next/image";
import logo from "./logo-text-and-beer.png";

export default function login() {
  return (
    <div className="flex justify-center items-center h-[100vh] flex-col">
      <Image src={logo} alt="Logo" width={200} height={200} className="block" />
      {/* Button for login */}
      <div className="flex justify-center items-center flex-col mt-8 w-[30%] lg:w-[20%] xl:w-[15%] 2xl:w-[10%]">
        <button
          className="block 
        text-white
        hover:bg-yellow-600
        bg-yellow-500
        font-bold 
        py-2 
        px-4 
        rounded
        w-full"
        >
          Login
        </button>
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
        w-full"
        >
          Register
        </button>
      </div>
    </div>
  );
}
