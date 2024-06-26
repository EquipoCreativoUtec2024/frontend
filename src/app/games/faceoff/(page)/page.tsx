import Faceoff from "../_components/faceoff";
import Image from "next/image";
import logo from "@app/assets/logo-text-and-beer.png";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray100 flex-col items-center justify-between p-24">
      <Faceoff />
    </main>
  );
};
