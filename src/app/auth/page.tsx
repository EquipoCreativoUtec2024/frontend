"use client";
import React from "react";
import Image from "next/image";
import logo from "./logo-text-and-beer.png";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function landing() {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };
  return (
    <div className="flex justify-center items-center h-[100vh] flex-col">
      <Image src={logo} alt="Logo" width={200} height={200} className="block" />
      <div className="flex justify-center items-center flex-col mt-8 w-[30%] lg:w-[20%] xl:w-[15%] 2xl:w-[10%]">
        <Link
          href="/auth/login"
          className="block 
          text-white
          hover:bg-yellow-600
          bg-yellow-500
          font-bold 
          py-2 
          px-4 
          rounded
          w-full
          text-center"
          onClick={handleLoginClick}
        >
          Login
        </Link>
        <Link
          href="/auth/register"
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
          onClick={handleRegisterClick}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
