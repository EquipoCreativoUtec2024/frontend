import Faceoff from "../_components/faceoff";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const userData = JSON.parse(Cookies.get("userData") ?? "{}");
  if (!userData.username) {
    router.push("/auth");
  }

  return (
    <main className="flex min-h-screen bg-gray100 flex-col items-center justify-between p-24">
      <Faceoff />
    </main>
  );
};
